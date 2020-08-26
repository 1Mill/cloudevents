const { Kafka } = require('kafkajs');
const { createAuthentication } = require('./createAuthentication');

const eventStream = async ({
	id,
	mechanism,
	password,
	protocal,
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

	const emit = ({}) => { console.log('Emitting') }
	const listen = ({}) => { console.log('Listening') }
	return { emit, listen }
}

module.exports = { eventStream }
