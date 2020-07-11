const { KAFKA_EVENTTYPE } = require('../lib/constants');

const createBroker = ({
	eventType,
	id,
	password,
	urls = [],
	username,
}) => {
	// TODO: Support more event types (e.g. rabbitmq)
	if (eventType !== KAFKA_EVENTTYPE) {
		throw Error('Unsupported broker event type');
	}
	return {
		eventType,
		id,
		password,
		urls,
		username,
	};
};

module.exports = { createBroker };
