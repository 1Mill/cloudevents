const handler = (func) => {
	return async (event, _context, _callback) => {
		const cloudevent = event
		const payload = await func({ cloudevent })
		return payload // * Returned to AWS invoker if 'RequestResponse' type
	}
}

module.exports = { handler }
