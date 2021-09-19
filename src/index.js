const { nanoid } = require('nanoid')

const fetchNodeEnv = name => process && process.env && process.env[name]

class Cloudevent {
	constructor({
		data,
		datacontenttype,
		dataschema,
		originid,
		originsource,
		origintime,
		origintype,
		source,
		specversion,
		subject,
		type,
	}) {
		// * Required fields by CloudEvent specification
		this.id = nanoid(fetchNodeEnv('MILL_CLOUDEVENTS_NANOID_LENGTH') || 21)
		if (!this.id) throw new Error('Cloudevent "id" is required')
		if (typeof this.id !== 'string') throw new Error('Cloudevent "id" must be a string')

		this.source = source || fetchNodeEnv('MILL_CLOUDEVENTS_SOURCE')
		if (!this.source) throw new Error('Cloudevent "source" is required')
		if (typeof this.source !== 'string') throw new Error('Cloudevent "source" must be a string')

		this.type = type
		if (!this.type) throw new Error('Cloudevent "type" is required')
		if (typeof this.type !== 'string') throw new Error('Cloudevent "type" must be a string')

		this.specversion = specversion || '1.0'
		if (!this.specversion) throw new Error('Cloudevent "specversion" is required')
		if (typeof this.specversion !== 'string') throw new Error('Cloudevent "specversion" must be a string')

		// * Optional fields by CloudEvent specification
		this.data = data

		this.datacontenttype = typeof this.data !== 'undefined'
			? datacontenttype || 'application/json'
			: datacontenttype
		if (this.datacontenttype && typeof this.datacontenttype !== 'string') throw new Error('Cloudevent "datacontenttype" must be a string')

		this.dataschema = dataschema
		if (this.dataschema && typeof this.dataschema !== 'string') throw new Error('Cloudevent "dataschema" must be a string')

		this.subject = subject
		if (this.subject && typeof this.subject !== 'string') throw new Error('Cloudevent "subject" must be a string')

		this.time = new Date().toISOString()

		// * In-house extentions
		this.origintime = origintime || this.time
		if (!this.origintime) throw new Error('Cloudevent "origintime" is required')
		if (typeof this.origintime !== 'string') throw new Error('Cloudevent "origintime" must be a string')

		this.originid = originid || this.id
		if (!this.originid) throw new Error('Cloudevent "originid" is required')
		if (typeof this.originid !== 'string') throw new Error('Cloudevent "originid" must be a string')

		this.originsource = originsource || this.source
		if (!this.originsource) throw new Error('Cloudevent "originsource" is required')
		if (typeof this.originsource !== 'string') throw new Error('Cloudevent "originsource" must be a string')

		this.origintype = origintype || this.type
		if (!this.origintype) throw new Error('Cloudevent "origintype" is required')
		if (typeof this.origintype !== 'string') throw new Error('Cloudevent "origintype" must be a string')
	}
}

module.exports = Object.freeze({ Cloudevent })
