const { PROTOCOL_KAFKA, PROTOCOL_LAMBDA } = require('./lib/constants')
const { createInstance: kafkaCreateInstance } = require('./kafka')
const { createInstance: lambdaCreateInstance } = require('./lambda')

const SUPPORTED_PROTOCOLS = [
	PROTOCOL_KAFKA,
	PROTOCOL_LAMBDA,
]

const createEventStream = ({
	id,
	mechanism,
	password,
	protocol,
	urls,
	username,
}) => {
	if (!SUPPORTED_PROTOCOLS.includes(protocol)) { throw new Error(`The "${protocol}" protocol is not supported`);}

	if (protocol === PROTOCOL_KAFKA) {
		return kafkaCreateInstance({
			id,
			mechanism,
			password,
			urls,
			username,
		})
	}

	if (protocol === PROTOCOL_LAMBDA) {
		return lambdaCreateInstance({})
	}
}

module.exports = { createEventStream }
