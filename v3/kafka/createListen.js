const { ERROR_TYPES, SIGNAL_TRAPS } = require('../lib/constants')
const { Kafka } = require('kafkajs')
const { convertFrom } = require('./convertFrom')
const { createAuthentication } = require('./createAuthentication')
const { isEnriched } = require('../isEnriched')

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
	const listen = async ({ handler, types }) => {
		await connect()
		await Promise.all(types.map(type => consumer.subscribe({
			fromBeginning: true,
			topic: type,
		})))
		await run({
			eachMessage: async (event) => {
				const { cloudevent } = convertFrom({ event })
				await handler({
					...cloudevent,
					cloudevent,
					data: cloudevent.data
						? JSON.parse(cloudevent.data)
						: undefined,
					enrichmentdata: isEnriched({ cloudevent })
						? JSON.parse(cloudevent.enrichmentdata)
						: undefined,
					isEnriched: isEnriched({ cloudevent }),
				})
			}
		})

		// Before server stop, close subscription connections to kafka
		ERROR_TYPES.map(errorType => {
			process.on(errorType, async (err) => {
				try {
					console.log(`process.on ${errorType}`)
					console.error(err)
					await disconnect()
					process.exit(0)
				} catch (_err) {
					process.exit(1)
				}
			})
		})
		SIGNAL_TRAPS.map(signalTrap => {
			process.once(signalTrap, async () => {
				try {
					await disconnect()
				} finally {
					process.kill(process.pid, signalTrap)
				}
			})
		})
	}
	return { listen }
}

module.exports = { createListen }
