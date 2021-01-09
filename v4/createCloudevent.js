const createCloudevent = ({
	data,
	datacontenttype,
	dlx = 'dlx',
	id,
	originid,
	originsource,
	origintype,
	source,
	specversion = '1.0',
	type,
}) => {
	if (!id) { throw new Error('Cloudevent "id" is as required') }
	if (!source) { throw new Error('Cloudevent "source" is as required') }
	if (!type) { throw new Error('Cloudevent "type" is as required') }

	const cloudevent = {
		// Required defaults
		dlx,
		id,
		source,
		specversion,
		time: new Date().toISOString(),
		type,

		// Optional data
		data,
		datacontenttype,

		// Origin data
		originid: originid || id,
		originsource: originsource || source,
		origintype: origintype || type,
	}
	return cloudevent
}

module.exports = { createCloudevent }
