const convertFrom = ({ event }) => {
	const cloudevent = JSON.parse(event.message.event)
	return { cloudevent }
}

module.exports = { convertFrom }
