const converTo = ({ cloudevent }) => {
	const message = {
		headers: {
			contentType: 'application/cloudevents+json;charset=UTF-8'
		},
		value: JSON.stringify(cloudevent),
	}
	const event = { messages: [message], topic: cloudevent.type }
	return { event }
}

module.exports = { converTo }
