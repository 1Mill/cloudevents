export const fetchNodeEnv = (name: string, fallbackValue?: any) => {
	if (typeof process === 'undefined') { return }
	return process.env[name] || fallbackValue
}
