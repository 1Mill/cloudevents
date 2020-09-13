const { createCloudevent } = require('./createCloudevent')
const { createEventStream } = require('./createEventStream')
const { enrichCloudevent } = require('./enrichCloudevent')
const { isEnriched } = require('./isEnriched')

const v2 = {
	createCloudevent,
	createEventStream,
	enrichCloudevent,
	isEnriched,
}

module.exports = { v2 }
