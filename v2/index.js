const { createCloudevent } = require('./createCloudevent')
const { createEventStream } = require('./eventStream')
const { enrichCloudevent } = require('./enrichCloudevent')

const v2 = {
	createCloudevent,
	createEventStream,
	enrichCloudevent,
}

module.exports = { v2 }
