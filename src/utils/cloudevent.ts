import { Permitted, validateAttribute } from './validateAttribute.js'
import { fetchNodeEnv } from './fetchNodeEnv.js'
import { v7 as uuidv7 } from 'uuid'

export interface CloudeventState {
	// * Cloudevent v1 fields
	data?: unknown
	datacontenttype?: string
	dataschema?: string
	id: string
	source: string
	specversion: string
	subject?: string
	time: string
	type: string

	// * In-house extensions
	actor?: string
	wschannelid?: string

	// * In-house parent extensions
	parentid?: string
	parentrootid: string
}

export interface CloudeventProps extends Omit<CloudeventState, 'id' | 'time' | 'specversion' | 'parentid' | 'parentrootid'> {
	specversion?: CloudeventState['specversion'] // A default is used if not input, so make optional

	// * In-house parent extensions
	parent?: CloudeventState
}

export class Cloudevent implements CloudeventState {
	// * Cloudevent v1 fields
	readonly data?: CloudeventState['data']
	readonly datacontenttype?: CloudeventState['datacontenttype']
	readonly dataschema?: CloudeventState['dataschema']
	readonly id: CloudeventState['id']
	readonly source: CloudeventState['source']
	readonly specversion: CloudeventState['specversion']
	readonly subject?: CloudeventState['subject']
	readonly time: CloudeventState['time']
	readonly type: CloudeventState['type']

	// * In-house extensions
	readonly actor?: CloudeventState['actor']
	readonly wschannelid?: CloudeventState['wschannelid']

	// * In-house parent extensions
	readonly parentid?: CloudeventState['parentid']
	readonly parentrootid: CloudeventState['parentrootid']

	constructor({
		actor,
		data,
		datacontenttype,
		dataschema,
		parent,
		source,
		specversion,
		subject,
		type,
		wschannelid,
	}: CloudeventProps) {
		// * Cloudevent v1 required fields
		this.id = validateAttribute({
			name: 'id',
			permitted: [Permitted.STRING],
			value: `ce_${uuidv7()}`
		})

		this.source = validateAttribute({
			name: 'source',
			permitted: [Permitted.STRING],
			value: source ?? fetchNodeEnv('MILL_CLOUDEVENTS_SOURCE')
		})

		this.type = validateAttribute({
			name: 'type',
			permitted: [Permitted.STRING],
			value: type
		})

		this.specversion = validateAttribute({
			name: 'specversion',
			permitted: [Permitted.STRING],
			value: specversion ?? '1.0'
		})

		this.time = validateAttribute({
			name: 'time',
			permitted: [Permitted.STRING],
			value: new Date().toISOString()
		})

		// * Cloudevent v1 optional fields
		const dataValue = datacontenttype === undefined ? JSON.stringify(data) : data

		this.data = validateAttribute({
			name: 'data',
			value: dataValue
		})

		this.datacontenttype = validateAttribute({
			name: 'datacontenttype',
			permitted: [Permitted.STRING, Permitted.UNDEFINED],
			value: this.data
				? datacontenttype ?? 'application/json'
				: datacontenttype
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

		// * In-house extensions
		this.actor = validateAttribute({
			name: 'actor',
			permitted: [Permitted.STRING, Permitted.UNDEFINED],
			value: actor
		})

		this.wschannelid = validateAttribute({
			name: 'wschannelid',
			permitted: [Permitted.STRING, Permitted.UNDEFINED],
			value: wschannelid
		})

		// * In-house parent extensions
		this.parentid = validateAttribute({
			name: 'parentid',
			permitted: [Permitted.STRING, Permitted.UNDEFINED],
			value: parent?.id
		})

		this.parentrootid = validateAttribute({
			name: 'parentrootid',
			permitted: [Permitted.STRING],
			value: parent?.parentrootid ?? this.id
		})
	}
}
