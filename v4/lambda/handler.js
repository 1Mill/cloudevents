const { isEnriched } = require('../isEnriched')

const handler = (func) => {
	return async (event, _context, _callback) => {
		const cloudevent = event

		const {
			data,
			datacontenttype,
			enrichmentdata,
			enrichmentdatacontenttype,
		} = cloudevent

		const payload = await func({
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
		return payload // * Returned to AWS invoker if 'RequestResponse' type
	}
}

module.exports = { handler }
