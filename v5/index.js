const { PROTOCOL_KAFKA, PROTOCOL_LAMBDA } = require('./lib/constants')
const { createCloudevent } = require('./createCloudevent')
const { createCloudeventStream } = require('./createCloudeventStream')

const v5 = {
	PROTOCOL_KAFKA,
	PROTOCOL_LAMBDA,
	createCloudevent,
	createCloudeventStream,
}

module.exports = { v5 }
