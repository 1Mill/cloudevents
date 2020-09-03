// Client Configuration for KafkaJS: https://kafka.js.org/docs/configuration
const SCRAM_MECHANISMS = [
	'plain',
	'scram-sha-256',
	'scram-sha-512',
]

const createAuthentication = ({ mechanism, password, username }) => {
	if (SCRAM_MECHANISMS.includes(mechanism)) {
		return {
			sasl: { mechanism, password, username },
			ssl: true,
		}
	}

	return {}
}

module.exports = { createAuthentication }
