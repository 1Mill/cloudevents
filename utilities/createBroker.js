const { KAFKA_EVENTTYPE } = require('../lib/constants');

const createBroker = ({
	authentication,
	eventType,
	id,
	urls = [],
}) => {
	// TODO: Support more event types (e.g. rabbitmq)
	if (eventType !== KAFKA_EVENTTYPE) {
		throw Error('Unsupported broker event type');
	}
	return {
		authentication,
		eventType,
		id,
		password,
		urls,
		username,
	};
};

module.exports = { createBroker };
