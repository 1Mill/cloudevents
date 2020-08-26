const { KAFKA_PROTOCAL } = require('../lib/constants')
const { createInstance } = require('./builders/kafka')

const eventStream = ({
	id,
	mechanism,
	password,
	protocal,
	urls,
	username,
}) => {
	// TODO: Support more than just the kafka protocal
	if (protocal !== KAFKA_PROTOCAL) { throw Error('Unsupported protocal type') }

	const { emit, listen } = createInstance({
		id,
		mechanism,
		password,
		protocal,
		urls,
		username,
	})
	return { emit, listen }
}

module.exports = { eventStream }
