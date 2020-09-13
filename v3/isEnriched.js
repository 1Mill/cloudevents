const isEnriched = ({ cloudevent }) => {
	return cloudevent.enrichmentdata !== undefined;
}

module.exports = { isEnriched }
