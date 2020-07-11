const { ERROR_TYPES, SIGNAL_TRAPS } = require('../lib/constants');
const { Kafka } = require('kafkajs');
const { enrich } = require('./enrich');
const { fromEventType } = require('./fromEventType');
const { isEnriched } = require('./isEnriched');
const { publish } = require('./publish');

const subscribe = async({ broker, handler, publishBroker, types = [] }) => {
	const {
		eventType,
		id,
		password,
		urls,
		username,
	} = broker;

	const ssl = password && username;
	const sslConfig = ssl
		? { ssl, sasl: { mechanism: 'plain', password, username } }
		: {}
	const kafka = new Kafka({
		...sslConfig,
		brokers: urls,
		clientId: id,
	});

	const { connect, disconnect, run, subscribe } = kafka.consumer({ groupId: id });
	try {
		await connect();
		await types.forEach(async(type) => {
			await subscribe({ fromBeginning: true, topic: type });
		});
		await run({
			eachMessage: async(kafkaEvent) => {
				try {
					// Parse cloudevent
					const cloudevent = fromEventType({
						event: kafkaEvent,
						eventType,
					});

					// Enrich cloudevent for return
					const enrichment = await handler({
						...cloudevent,
						cloudevent,
						data: JSON.parse(cloudevent.data),
						enrichment: isEnriched({ cloudevent })
							? JSON.parse(cloudevent.enrichment)
							: undefined,
						isEnriched: isEnriched({ cloudevent }),
					});

					// If enriched, publish
					if (enrichment === undefined) { return; }
					const enrichedCloudevent = enrich({
						cloudevent,
						enrichment,
					});
					await publish({
						broker: publishBroker || broker,
						cloudevent: enrichedCloudevent,
					});
				} catch (err) {
					console.log(err);
				}
			},
		});
	} catch (err) {
		console.log(err);
	}

	// Before server stop, close subscription connections to kafka
	ERROR_TYPES.map((errorType) => {
		process.on(errorType, async (err) => {
			try {
				console.log(`process.on ${errorType}`);
				console.error(err);
				await disconnect();
				process.exit(0);
			} catch (_) {
				process.exit(1);
			}
		});
	});
	SIGNAL_TRAPS.map((signalTrap) => {
		process.once(signalTrap, async () => {
			try {
				await disconnect();
			} finally {
				process.kill(process.pid, signalTrap);
			}
		});
	});
};

module.exports = { subscribe };
