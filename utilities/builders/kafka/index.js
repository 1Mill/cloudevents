const { createEmit } = require('./createEmit')

const createInstance = ({
	id,
	mechanism,
	password,
	urls,
	username,
}) => {
	const emit = createEmit({
		id,
		mechanism,
		password,
		urls,
		username,
	})
	return { emit }
}

module.exports = { createInstance }
