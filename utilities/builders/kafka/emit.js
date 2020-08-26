const { Kafka } = require('kafkajs')
const { createAuthroization } = require('./createAuthorization')

const emit = ({
	id,
	mechanism,
	password,
	urls,
	username,
}) => {
	const authentication = createAuthentication({
		mechanism,
		password,
		username,
	})
	const kafka = new Kafka({
		...authentication,
		brokers: urls,
		clientId: id,
	})
}

module.exports = { emit }
