const convertFrom = ({ event }) => {
	const cloudevent = JSON.parse(event.message.value)
	return { cloudevent }
}

module.exports = { convertFrom }
