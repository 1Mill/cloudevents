const isCloudeventEnriched = ({ cloudevent }) => {
	return cloudevent && cloudevent.enrichment !== undefined
}

module.exports = { isCloudeventEnriched }
