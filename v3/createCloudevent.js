const createCloudevent = ({
	data,
	datacontenttype,
	dlx = 'dlx',
	enrichmentdata,
	enrichmentdatacontenttype,
	id,
	source,
	specversion = '1.0',
	time,
	type,
}) => {
	if (!id) { throw new Error('Cloudevent "id" is as required') }
	if (!source) { throw new Error('Cloudevent "source" is as required') }
	if (!type) { throw new Error('Cloudevent "type" is as required') }

	const isDataEncoded = data !== undefined && datacontenttype !== undefined
	const isEnrichmentEncoded = enrichmentdata !== undefined && enrichmentdatacontenttype !== undefined

	const cloudevent = {
		// Required defaults
		dlx,
		id,
		source,
		specversion,
		time: time || new Date().toISOString(),
		type,

		// Optional original data
		data: isDataEncoded
			? data
			: JSON.stringify(data),
		datacontenttype: isDataEncoded
			? datacontenttype
			: 'application/json',

		// Optional enrichment data
		enrichmentdata: isEnrichmentEncoded
			? enrichmentdata
			: JSON.stringify(enrichmentdata),
		enrichmentdatacontenttype: isEnrichmentEncoded
			? enrichmentcontenttype
			: 'application/json',
		enrichmenttime: enrichmentdata === undefined
			? undefined
			: new Date().toISOString(),
	}
	return cloudevent
}

module.exports = { createCloudevent }
