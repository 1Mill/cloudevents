const { ERROR_TYPES, SIGNAL_TRAPS } = require('../../../lib/constants')
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

		// Before server stop, close subscription connections to kafka
		ERROR_TYPES.map(errorType => {
			process.on(errorType, async (err) => {
				try {
					console.log(`process.on ${errorType}`);
					console.error(err);
					await disconnect();
					process.exit(0);
				} catch (_err) {
					process.exit(1);
				}
			})
		})
		SIGNAL_TRAPS.map(signalTrap => {
			process.once(signalTrap, async () => {
				try {
					await disconnect();
				} finally {
					process.kill(process.pid, signalTrap);
				}
			})
		})
	}
	return { listen }
}

module.exports = { createListen }
