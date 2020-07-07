const { KAFKA_EVENTTYPE } = require('../lib/constants');

const createBroker = ({ id, eventType, urls = [] }) => {
	// TODO: Support more event types (e.g. rabbitmq)
	if (eventType !== KAFKA_EVENTTYPE) {
		throw Error('Unsupported broker event type');
	}
	return { id, eventType, urls };
};

module.exports = { createBroker };
