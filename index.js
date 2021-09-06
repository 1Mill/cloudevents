const { nanoid } = require('nanoid')
const { v3 } = require('./v3')
const { v4 } = require('./v4')
const { v5 } = require('./v5')
const { v6 } = require('./v6')

const fetchNodeEnv = name => process && process.env && process.env[name]

class Cloudevent {
	constructor({
		data,
		datacontenttype,
		dataschema,
		id,
		originid,
		originsource,
		origintype,
		source,
		specversion,
		subject,
		type,
	}) {
		// * Required fields by CloudEvent specification
		this.id = id || nanoid(fetchNodeEnv('MILL_CLOUDEVENTS_NANOID_LENGTH') || 21)
		if (!this.id) throw new Error('Cloudevent "id" is required')

		this.source = source || fetchNodeEnv('MILL_CLOUDEVENTS_SOURCE')
		if (!this.source) throw new Error('Cloudevent "source" is required')

		this.type = type
		if (!this.type) throw new Error('Cloudevent "type" is required')

		this.specversion = specversion || '1.0'
		if (!this.specversion) throw new Error('Cloudevent "specversion" is required')

		// * Optional fields by CloudEvent specification
		this.data = data
		this.datacontenttype = typeof this.data !== 'undefined'
			? datacontenttype || 'application/json'
			: datacontenttype
		this.dataschema = dataschema
		this.subject = subject
		this.time = new Date().toISOString()

		// * In-house extentions
		this.originid = originid || this.id
		this.originsource = originsource || this.source
		this.origintype = origintype || this.type
	}
}


module.exports = Object.freeze({ Cloudevent, v3, v4, v5, v6 })
