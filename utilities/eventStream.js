class EventStream {
	constructor({ mechanism, password, protocal, urls, username }) {
		this.mechanism = mechanism
		this.password = password
		this.protocal = protocal
		this.urls = urls
		this.username = username
	}

	async emit({ cloudevent }) {
	}

	async listen({ types, handler }) {
	}
}
