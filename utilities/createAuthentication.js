// Client Configuration for KafkaJS: https://kafka.js.org/docs/configuration
const createAuthentication = ({ type, config }) => {
	if (type === 'ssl') { return config; }
	if (type === 'sasl') { return { sasl: config, ssl: true }; }
	return {};
}

module.exports = { createAuthentication };
