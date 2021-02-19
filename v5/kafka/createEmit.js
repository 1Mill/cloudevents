const { Kafka } = require('kafkajs')
const { convertTo } = require('./convertTo')
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

	const emit = async ({ cloudevent }) => {
		const producer = kafka.producer()
		await producer.connect()
		const { event } = convertTo({ cloudevent })
		await producer.send(event)
		await producer.disconnect()
	}
	return { emit }
}

module.exports = { createEmit }
