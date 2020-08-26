// Client Configuration for KafkaJS: https://kafka.js.org/docs/configuration
const createAuthentication = ({ mechanism, password, username }) => {
	if (mechanism === 'sasl') {
		return {
			sasl: { password, username },
			ssl: true,
		};
	}
	if (mechanism === 'ssl') {
		return { password, username };
	}
	return {};
};

module.exports = { createAuthentication };
