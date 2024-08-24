export enum Permitted {
	NUMBER = 'number',
	STRING = 'string',
	UNDEFINED = 'undefined',
}

interface ValidateAttributeProps {
	deprecated?: boolean
	name: string
	permitted?: Permitted[]
	value: any
}

export const validateAttribute = ({ deprecated = false, name, permitted = [], value }: ValidateAttributeProps) => {
	if (deprecated) { console.warn(`Cloudevent "${name}" is depricated`) }

	if (permitted.length >= 1 && !permitted.includes(typeof value as any)) {
		const message = `Cloudevent "${name}" must be of type ${permitted.map(s => s.toUpperCase()).sort().join(' or ')}.`
		throw new Error(message)
	}

	return value
}
