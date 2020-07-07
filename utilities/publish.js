const { KAFKA_EVENTTYPE } = require('../lib/constants');
const { Kafka } = require('kafkajs');
const { toEventType } = require('./toEventType');

const _publishToKafka = async({ broker, cloudevent }) => {
	const { id, urls } = broker;
	const kafka = new Kafka({
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
