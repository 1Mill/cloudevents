export const setAttribute = ({ cloudevent, deprecated = false, name, types = [], value }) => {
	if (deprecated) { console.warn(`Cloudevent "${name}" is depricated`) }

	if (types.length > 0 && !types.includes(typeof value)) {
		const message = `Cloudevent "${name}" must be of type ${types.map(s => s.toUpperCase()).sort().join(' or ')}.`
		throw new Error(message)
	}

	cloudevent[name] = value
}
