const { PROTOCOL_KAFKA, PROTOCOL_LAMBDA } = require('./lib/constants')
const { createCloudevent } = require('./createCloudevent')
const { createEventStream } = require('./createEventStream')

const v3 = {
	PROTOCOL_KAFKA,
	PROTOCOL_LAMBDA,
	createCloudevent,
	createEventStream,
	enrichCloudevent,
	isEnriched,
}

module.exports = { v3 }
