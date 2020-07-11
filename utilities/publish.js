const { KAFKA_EVENTTYPE } = require('../lib/constants');
const { Kafka } = require('kafkajs');
const { toEventType } = require('./toEventType');

const _publishToKafka = async({ broker, cloudevent }) => {
	const {
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

	const { connect, disconnect, send } = kafka.producer();
	await connect();
	const kafkaEvent = toEventType({
		cloudevent,
		eventType: KAFKA_EVENTTYPE,
	});
	await send(kafkaEvent);
	await disconnect();
};

const publish = async({ broker, cloudevent }) => {
	try {
		const { eventType } = broker;
		if (eventType === KAFKA_EVENTTYPE) {
			await _publishToKafka({ broker, cloudevent });
		}
	} catch (err) {
		console.error(err);
	}
};

module.exports = { publish };
