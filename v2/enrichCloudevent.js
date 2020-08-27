const enrichCloudevent = ({
	cloudevent,
	enrichment = null,
	enrichmentcontenttype = 'application/json',
}) => {
	return {
		...cloudevent,
		enrichment: JSON.stringify(enrichment),
		enrichmentcontenttype,
		time: new Date().toISOString(),
	}
}

module.exports = { enrichCloudevent }
