const create = ({
	data = null,
	datacontenttype = 'application/json',
	dlx = 'dlx',
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
		dlx,
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
