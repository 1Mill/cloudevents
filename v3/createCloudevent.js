const createCloudevent = ({
	data = undefined,
	datacontenttype = undefined,
	dlx = 'dlx',
	enrichment = undefined,
	enrichmentcontenttype = undefined,
	id,
	source,
	specversion = '1.0',
	type,
}) => {
	if (!id) { throw new Error('Cloudevent "id" is as required') }
	if (!source) { throw new Error('Cloudevent "source" is as required') }
	if (!type) { throw new Error('Cloudevent "type" is as required') }

	const isDataEncoded = data !== undefined && datacontenttype !== undefined
	const isEnrichmentEncoded = enrichment !== undefined && enrichmentcontenttype !== undefined

	const cloudevent = {
		// Required defaults
		dlx,
		id,
		source,
		specversion,
		time: new Date().toISOString(),
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
			? enrichment
			: JSON.stringify(enrichment),
		enrichmentdatacontenttype: isEnrichmentEncoded
			? enrichmentcontenttype
			: 'application/json',
		enrichmenttime: enrichment === undefined
			? undefined
			: new Date().toISOString(),
	}
	return cloudevent
}

module.exports = { createCloudevent }
