const { Kafka } = require('kafkajs')
const { createAuthentication } = require('./createAuthentication')

const createEmit = ({
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
	const { connect, disconnect, send } = kafka.producer()

	const emit = ({ cloudevent }) => {
		await connect()
		// TODO: Convert cloudevent to kafka-event
		const event = { topic: 'TODO', messages: [] }
		await send(event)
		await disconnect()
	}
	return emit
}

module.exports = { createEmit }
