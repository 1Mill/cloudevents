const eventStream = async ({
	mechanism,
	password,
	protocal,
	urls,
	username,
}) => {
	const emit = ({}) => { console.log('Emitting') }
	const listen = ({}) => { console.log('Listening') }
	return { emit, listen }
}

module.exports = { eventStream }
