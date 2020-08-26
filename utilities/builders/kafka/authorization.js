// Client Configuration for KafkaJS: https://kafka.js.org/docs/configuration
const authorization = ({ mechanism, password, username }) => {
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

module.exports = { authorization };
