const { createEmit } = require('./createEmit')
const { createListen } = require('./createListener')

const createInstance = ({
	id,
	mechanism,
	password,
	urls,
	username,
}) => {
	const { emit } = createEmit({
		id,
		mechanism,
		password,
		urls,
		username,
	})
	const { listen } = createListen({
		id,
		mechanism,
		password,
		urls,
		username,
	});
	return { emit, listen }
}

module.exports = { createInstance }
