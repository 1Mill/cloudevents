const { Kafka } = require('kafkajs')
const { createAuthentication } = require('./createAuthentication')

const createListen = ({
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

	const { connect, disconnect, run, subscribe } = kafka.consumer({ groupId: id })
	const listen = async ({ hanlder, types }) => {
		await connect()
		await types.forEach(async (types) => {
			await subscribe({ fromBeginning: true, topic: type })
		})
		await run({
			eachMessage: async(kafkaEvent) => {
				// TODO: Convert kafka-event to cloudevent
				const cloudevent = {}
				await hanlder({ cloudevent })
			}
		})
	}
	return { listen }
}

module.exports = { createListen }
