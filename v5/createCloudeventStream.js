const { PROTOCOL_KAFKA, PROTOCOL_LAMBDA } = require('./lib/constants')
const { createInstance: kafkaCreateInstance } = require('./kafka')
const { createInstance: lambdaCreateInstance } = require('./lambda')

const SUPPORTED_PROTOCOLS = [
	PROTOCOL_KAFKA,
	PROTOCOL_LAMBDA,
]

const _throwRequired = (attribute) => {
	throw new Error(`The ${attribute} argument is required`)
}

const createCloudeventStream = ({
	id = process.env.CLOUDEVENT_STREAM_ID,
	mechanism = process.env.CLOUDEVENT_STREAM_MECHANISM,
	password = process.env.CLOUDEVENT_STREAM_PASSWORD,
	protocol = process.env.CLOUDEVENT_STREAM_PROTOCOL,
	urls = (process.env.CLOUDEVENT_STREAM_URLS || '').split(','),
	username = process.env.CLOUDEVENT_STREAM_USERNAME,
}) => {
	if (!protocol) { _throwRequired('protocol') }
	if (!SUPPORTED_PROTOCOLS.includes(protocol)) { throw new Error(`The "${protocol}" protocol is not supported`) }

	if (protocol === PROTOCOL_KAFKA) {
		if (!id) { _throwRequired('id') }
		if (!urls.length === 0) { _throwRequired('urls') }
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

module.exports = { createCloudeventStream }
