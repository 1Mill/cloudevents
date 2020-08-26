const { KAFKA_PROTOCAL } = require('../lib/constants')
const { Kafka } = require('kafkajs')
const { createAuthentication } = require('./createAuthentication')

const eventStream = ({
	id,
	mechanism,
	password,
	protocal,
	urls,
	username,
}) => {
	// TODO: Support more than just the kafka protocal
	if (protocal !== KAFKA_PROTOCAL) { throw Error('Unsupported protocal type'); }

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

	const emit = _emit
	const listen = ({}) => { console.log('Listening') }
	return { emit, listen }
}

const _emit = async ({ cloudevent, kafka }) => {
	const { connect, disconnect, send } = kafka.producer()
	await connect()
	// TODO: Cloudevent to kafka event
	const kafkaEvent = { topic: 'TODO', messages: [] }
	await send(kafkaEvent)
	await disconnect()
}

module.exports = { eventStream }
