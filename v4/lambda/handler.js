const handler = (func) => {
	return async (event, _context, _callback) => {
		const cloudevent = event

		const { data, datacontenttype } = cloudevent
		const payload = await func({
			...cloudevent,
			cloudevent,
			data: !!data && datacontenttype === 'application/json'
				? JSON.parse(data)
				: data,
		})
		return payload // * Returned to AWS invoker if 'RequestResponse' type
	}
}

module.exports = { handler }
