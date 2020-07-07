const create = ({
	data = null,
	datacontenttype = 'application/json',
	enrichment = undefined,
	enrichmentcontenttype = undefined,
	id,
	source,
	specversion = '1.0',
	type,
}) => {
	const cloudevent = {
		data: JSON.stringify(data),
		datacontenttype,
		enrichment,
		enrichmentcontenttype,
		id,
		source,
		specversion,
		time: new Date().toISOString(),
		type,
	};
	return cloudevent;
};

module.exports = { create };
