const { ERROR_TYPES, SIGNAL_TRAPS } = require('../lib/constants')
const { Kafka } = require('kafkajs')
const { convertFrom } = require('./convertFrom')
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

	const listen = async ({ handler, types }) => {
		const consumer = kafka.consumer({ groupId: id });
		await consumer.connect()

		const promises = types.map(type => {
			consumer.subscribe({
				fromBeginning: type.fromBeginning || false,
				topic: type.type || type,
			})
		})
		await Promise.all(promises)

		await consumer.run({
			eachMessage: async (event) => {
				try {
					const { cloudevent } = convertFrom({ event })
					await handler({ cloudevent })
				} catch (err) {
					console.error(err)
				}
			}
		})

		// Before server stop, close subscription connections to kafka
		ERROR_TYPES.map(errorType => {
			process.on(errorType, async (err) => {
				try {
					console.log(`process.on ${errorType}`)
					console.error(err)
					await consumer.disconnect()
					process.exit(0)
				} catch (_err) {
					process.exit(1)
				}
			})
		})
		SIGNAL_TRAPS.map(signalTrap => {
			process.once(signalTrap, async () => {
				try {
					await consumer.disconnect()
				} finally {
					process.kill(process.pid, signalTrap)
				}
			})
		})
	}
	return { listen }
}

module.exports = { createListen }
