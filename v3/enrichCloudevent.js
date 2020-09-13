const createCloudevent = require('./createCloudevent')

const enrichCloudevent = ({
	cloudevent,
	enrichmentdata,
	enrichmentdatacontenttype,
}) => {
	return createCloudevent({
		...cloudevent,
		enrichmentdata,
		enrichmentdatacontenttype,
	})
}

module.exports = { enrichCloudevent }
