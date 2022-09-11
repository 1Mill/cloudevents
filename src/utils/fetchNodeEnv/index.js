export const fetchNodeEnv = (name, fallbackValue) => {
	if (typeof process === 'undefined') { return }
	return process.env[name] || fallbackValue
}
