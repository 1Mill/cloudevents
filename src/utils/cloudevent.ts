import { Permitted, validateAttribute } from './validateAttribute.js'
import { fetchNodeEnv } from './fetchNodeEnv.js'
import { nanoid } from 'nanoid'

export interface CloudeventProps {
	// * Cloudevent v1 props
	data?: Cloudevent['data']
	datacontenttype?: Cloudevent['datacontenttype']
	dataschema?: Cloudevent['dataschema']
	source?: Cloudevent['source']
	specversion?: Cloudevent['specversion']
	subject?: Cloudevent['subject']
	type: Cloudevent['type']

	// * In-house extension props
	actor?: Cloudevent['actor']
	wschannelid?: Cloudevent['wschannelid']

	// * In-house helpers
	origin?: Cloudevent
}

export class Cloudevent {
	// * Cloudevents v1 fields
	readonly data?: any
	readonly datacontenttype?: string
	readonly dataschema?: string
	readonly id: string
	readonly source: string
	readonly specversion: string
	readonly subject?: string
	readonly time: string
	readonly type: string

	// * In-house extensions
	readonly actor?: string
	readonly wschannelid?: string

	// * In-house origin extensions
	readonly originid: Cloudevent['id']
	readonly originsource: Cloudevent['source']
	readonly origintime: Cloudevent['time']
	readonly origintype: Cloudevent['type']

	constructor({
		actor,
		data,
		datacontenttype,
		dataschema,
		origin,
		source,
		specversion,
		subject,
		type,
		wschannelid,
	}: CloudeventProps) {
		// *******
		// * Required fields by Cloudevent v1 specification
		const idValue = 'ce_' + nanoid(33)
		this.id = validateAttribute({
			name: 'id',
			permitted: [Permitted.STRING],
			value: idValue
		})

		const sourceValue = source ?? fetchNodeEnv('MILL_CLOUDEVENTS_SOURCE')
		this.source = validateAttribute({
			name: 'source',
			permitted: [Permitted.STRING],
			value: sourceValue
		})

		this.type = validateAttribute({
			name: 'type',
			permitted: [Permitted.STRING],
			value: type
		})

		const specversionValue = specversion ?? '1.0'
		this.specversion = validateAttribute({
			name: 'specversion',
			permitted: [Permitted.STRING],
			value: specversionValue
		})

		const timeValue = new Date().toISOString()
		this.time = validateAttribute({
			name: 'time',
			permitted: [Permitted.STRING],
			value: timeValue
		})
		// *******

		// *******
		// * Optional fields by Cloudevent v1 specification
		const dataValue = datacontenttype === undefined ? JSON.stringify(data) : data
		this.data = validateAttribute({
			name: 'data',
			value: dataValue
		})

		const datacontenttypeValue = this.data
			? datacontenttype ?? 'application/json'
			: datacontenttype
		this.datacontenttype = validateAttribute({
			name: 'datacontenttype',
			permitted: [Permitted.STRING, Permitted.UNDEFINED],
			value: datacontenttypeValue
		})

		this.dataschema = validateAttribute({
			name: 'dataschema',
			permitted: [Permitted.STRING, Permitted.UNDEFINED],
			value: dataschema
		})

		this.subject = validateAttribute({
			name: 'subject',
			permitted: [Permitted.STRING, Permitted.UNDEFINED],
			value: subject
		})
		// *******

		// *******
		// * Optional in-house extentions
		this.actor = validateAttribute({
			name: 'actor',
			permitted: [Permitted.STRING, Permitted.UNDEFINED],
			value: actor,
		})

		this.wschannelid = validateAttribute({
			name: 'wschannelid',
			permitted: [Permitted.STRING, Permitted.UNDEFINED],
			value: wschannelid,
		})
		// *******

		// *******
		// * Origin in-house extentions
		const originidValue =  origin?.originid ?? this.id
		this.originid = validateAttribute({
			name: 'originid',
			permitted: [Permitted.STRING],
			value: originidValue,
		})

		const originsourceValue = origin?.originsource ?? this.source
		this.originsource = validateAttribute({
			name: 'originsource',
			permitted: [Permitted.STRING],
			value: originsourceValue,
		})

		const origintimeValue = origin?.origintime ?? this.time
		this.origintime = validateAttribute({
			name: 'origintime',
			permitted: [Permitted.STRING],
			value: origintimeValue,
		})

		const origintypeValue = origin?.origintype ?? this.type
		this.origintype = validateAttribute({
			name: 'origintype',
			permitted: [Permitted.STRING],
			value: origintypeValue,
		})
		// *******
	}
}
