const { Kafka } = require('kafkajs')
const { convertTo } = require('./converTo')
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

	const emit = async ({ cloudevent }) => {
		await connect()
		const { event } = convertTo({ cloudevent })
		await send(event)
		await disconnect()
	}
	return { emit }
}

module.exports = { createEmit }
