const create = ({
	data = null,
	datacontenttype = 'application/json',
	id,
	source,
	specversion = '1.0',
	type,
}) => {
	const cloudevent = {
		data: JSON.stringify(data),
		datacontenttype,
		id,
		source,
		specversion,
		time: new Date().toISOString(),
		type,
	};
	return cloudevent;
};

module.exports = { create };
