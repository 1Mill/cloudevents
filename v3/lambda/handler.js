const { isEnriched } = require('../isEnriched')

const handler = (someFunction) => {
	return async (event, _context, _callback) => {
		const cloudevent = event

		const {
			data,
			datacontenttype,
			enrichmentdata,
			enrichmentdatacontenttype,
		} = cloudevent

		await someFunction({
			...cloudevent,
			cloudevent,
			data: datacontenttype === 'application/json'
				? JSON.parse(data)
				: data,
			enrichmentdata: enrichmentdatacontenttype === 'application/json'
				? JSON.parse(enrichmentdata)
				: enrichmentdata,
			isEnriched: isEnriched({ cloudevent })
		})
	}
}

module.exports = { handler }
