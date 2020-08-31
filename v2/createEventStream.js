const { PROTOCOL_KAFKA } = require('./lib/constants')
const { createInstance } = require('./kafka')

const createEventStream = ({
	id,
	mechanism,
	password,
	protocol,
	urls,
	username,
}) => {
	// TODO: Support more than just the kafka protocal
	if (protocol !== PROTOCOL_KAFKA) { throw Error('Unsupported protocal type') }
	const { emit, listen } = createInstance({
		id,
		mechanism,
		password,
		urls,
		username,
	})
	return { emit, listen }
}

module.exports = { createEventStream }
