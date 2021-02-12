const handler = (func) => {
	return async (event, _context, callback) => {
		try {
			const cloudevent = event
			const payload = await func({ ...cloudevent, cloudevent })
			callback(null, payload)
		} catch (err) {
			callback(err, null)
		}
	}
}

module.exports = { handler }
