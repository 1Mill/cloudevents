class EventStream {
	constructor({ mechanism, password, protocal, urls, username }) {
		this.mechanism = mechanism
		this.password = password
		this.protocal = protocal
		this.urls = urls
		this.username = username
	}

	_authentication() {
		if (this.mechanism === 'sasl') {
			return {
				sasl: {
					password: this.password,
					username: this.username,
				},
				ssl: true,
			}
		}
		if (this.mechanism === 'ssl') {
			return {
				password: this.password,
				username: this.username,
			}
		}
		return {}
	}

	async emit({ cloudevent }) {
	}

	async listen({ types, handler }) {
	}
}

module.exports = { EventStream };
