const isEnriched = ({ cloudevent }) => {
	return cloudevent && cloudevent.enrichment !== undefined
}

module.exports = { isEnriched }
