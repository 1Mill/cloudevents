const { createCloudevent } = require('./createCloudevent')
const { createEventStream } = require('./eventStream')
const { enrichCloudevent } = require('./enrichCloudevent')
const { isCloudeventEnriched } = require('./isCloudeventEnriched')

const v2 = {
	createCloudevent,
	createEventStream,
	enrichCloudevent,
	isCloudeventEnriched,
}

module.exports = { v2 }
