const { createCloudevent } = require('./createCloudevent')
const { createEventStream } = require('./createEventStream')
const { enrich } = require('./enrich')
const { isEnriched } = require("./isEnriched");

const v2 = {
	createCloudevent,
	createEventStream,
	enrich,
	isEnriched,
}

module.exports = { v2 }
