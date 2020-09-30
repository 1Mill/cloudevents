const createCloudevent = ({
	data,
	datacontenttype,
	dlx = 'dlx',
	id,
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
	}
	return cloudevent
}

module.exports = { createCloudevent }
