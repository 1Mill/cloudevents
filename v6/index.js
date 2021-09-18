const createCloudevent = ({
	data,
	datacontenttype,
	dataschema,
	id,
	originid,
	originsource,
	origintime,
	origintype,
	source,
	specversion = '1.0',
	subject,
	type,
}) => {
	if (!id) { throw new Error('Cloudevent "id" is as required') }
	if (!source) { throw new Error('Cloudevent "source" is as required') }
	if (!type) { throw new Error('Cloudevent "type" is as required') }

	const time = new Date().toUTCString()

	const cloudevent = {
		// * Defined in cloudevents specification
		// Required defaults
		id,
		source,
		specversion,
		time,
		type,

		// Optional data
		data,
		datacontenttype, // ! Assumed to be 'application/json' unless otherwise stated
		dataschema,
		subject,

		// * In-house attribute extensions
		originid: originid || id,
		originsource: originsource || source,
		origintime: origintime || time,
		origintype: origintype || type,
	}
	return cloudevent
}

module.exports = { v6: { createCloudevent } }
