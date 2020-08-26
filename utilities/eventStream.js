const { Kafka } = require('kafkajs');

class EventStream {
	constructor({ id, mechanism, password, protocal, urls, username }) {
		this.id = id
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

	_kafka() {
		return new Kafka({
			...this._authentication,
			brokers: this.urls,
			clientId: this.id,
		})
	}

	async emit({ cloudevent }) {
	}

	async listen({ types, handler }) {
	}
}

module.exports = { EventStream };
