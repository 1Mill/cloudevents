// Client Configuration for KafkaJS: https://kafka.js.org/docs/configuration
const createAuthentication = ({ mechanism, password, username }) => {
	if (mechanism == 'scram-sha-256') {
		return {
			sasl: { password, username },
			ssl: true,
		}
	}
	return {}
}

module.exports = { createAuthentication }
