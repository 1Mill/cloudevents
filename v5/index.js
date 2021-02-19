const { PROTOCOL_KAFKA, PROTOCOL_LAMBDA } = require('./lib/constants')
const { createCloudevent } = require('./createCloudevent')
const { createEventStream } = require('./createEventStream')

const v5 = {
	PROTOCOL_KAFKA,
	PROTOCOL_LAMBDA,
	createCloudevent,
	createEventStream,
}

module.exports = { v5 }
