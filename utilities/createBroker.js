const publish = require('./publish');
const subscribe = require('./subscribe');

const createBroker = ({ id, eventType, urls = [] }) => {
	return { id, eventType, urls };
};

module.exports = { createBroker };
