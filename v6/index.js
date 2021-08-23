const createCloudevent = ({
	data,
	datacontenttype,
	dataschema,
	dlx = 'dlx',
	id,
	originid,
	originsource,
	origintype,
	source,
	specversion = '1.0',
	subject,
	type,
}) => {
	if (!dlx) { throw new Error('Cloudevent "dlx" is as required') }
	if (!id) { throw new Error('Cloudevent "id" is as required') }
	if (!source) { throw new Error('Cloudevent "source" is as required') }
	if (!type) { throw new Error('Cloudevent "type" is as required') }

	const cloudevent = {
		// * Defined in cloudevents specification
		// Required defaults
		id,
		source,
		specversion,
		time: new Date().toISOString(),
		type,

		// Optional data
		data,
		datacontenttype,
		dataschema,
		subject,

		// * In-house attribute extensions
		// Required defaults
		dlx,

		// Origin data
		originid: originid || id,
		originsource: originsource || source,
		origintype: origintype || type,
	}
	return cloudevent
}

module.exports = { v6: { createCloudevent } }
