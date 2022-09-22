import { fetchNodeEnv } from './utils/fetchNodeEnv/index.js'
import { nanoid } from 'nanoid'
import { setAttribute } from './utils/setAttribute/index.js'

export class Cloudevent {
	constructor({
		data,
		datacontenttype,
		dataschema,
		originactor,
		originatorid,
		originid,
		originsource,
		origintime,
		origintype,
		source,
		specversion,
		subject,
		type,
		wschannelid,
	}) {
		const ce = this

		// *******
		// * Required fields by Cloudevent v1 specification
		const idValue = nanoid(fetchNodeEnv('MILL_CLOUDEVENTS_NANOID_LENGTH', 21))
		setAttribute({
			cloudevent: ce,
			name: 'id',
			types: ['string'],
			value: idValue
		})

		const sourceValue = source || fetchNodeEnv('MILL_CLOUDEVENTS_SOURCE')
		setAttribute({
			cloudevent: ce,
			name: 'source',
			types: ['string'],
			value: sourceValue
		})

		const typeValue = type
		setAttribute({
			cloudevent: ce,
			name: 'type',
			types: ['string'],
			value: typeValue
		})

		const specversionValue = specversion || '1.0'
		setAttribute({
			cloudevent: ce,
			name: 'specversion',
			types: ['string'],
			value: specversionValue
		})

		const timeValue = new Date().toISOString()
		setAttribute({
			cloudevent: ce,
			name: 'time',
			types: ['string'],
			value: timeValue
		})
		// *******

		// *******
		// * Optional fields by Cloudevent v1 specification
		setAttribute({
			cloudevent: ce,
			name: 'data',
			value: data
		})

		const datacontenttypeValue = typeof data !== 'undefined'
			? datacontenttype || 'application/json'
			: datacontenttype
		setAttribute({
			cloudevent: ce,
			name: 'datacontenttype',
			types: ['string', 'undefined'],
			value: datacontenttypeValue
		})

		setAttribute({
			cloudevent: ce,
			name: 'dataschema',
			types: ['string', 'undefined'],
			value: dataschema
		})

		setAttribute({
			cloudevent: ce,
			name: 'subject',
			types: ['string', 'undefined'],
			value: subject
		})
		// *******

		// *******
		// * Required in-house extentions
		this.origin({
			cloudevent: ce,
			originactor,
			originid,
			originsource,
			origintime,
			origintype,
		})
		// *******

		// *******
		// * Optional in-house extentions
		this.originator({
			cloudevent: ce,
			originatorid,
		})

		this.wschannel({
			cloudevent: ce,
			wschannelid,
		})
		// *******
	}

	origin = ({ cloudevent = {}, originactor, originid, originsource, origintime, origintype }) => {
		const ce = this

		const originactorValue = originactor || cloudevent['originactor']
		setAttribute({
			cloudevent: ce,
			name: 'originactor',
			types: ['string', 'undefined'],
			value: originactorValue,
		})

		const originidValue = originid || cloudevent['originid'] || cloudevent['id']
		setAttribute({
			cloudevent: ce,
			name: 'originid',
			types: ['string'],
			value: originidValue,
		})

		const originsourceValue = originsource || cloudevent['originsource'] || cloudevent['source']
		setAttribute({
			cloudevent: ce,
			name: 'originsource',
			types: ['string'],
			value: originsourceValue,
		})

		const origintimeValue = origintime || cloudevent['origintime'] || cloudevent['time']
		setAttribute({
			cloudevent: ce,
			name: 'origintime',
			types: ['string'],
			value: origintimeValue,
		})

		const origintypeValue = origintype || cloudevent['origintype'] || cloudevent['type']
		setAttribute({
			cloudevent: ce,
			name: 'origintype',
			types: ['string'],
			value: origintypeValue,
		})

		return ce
	}

	originator = ({ cloudevent = {}, originatorid }) => {
		const ce = this

		setAttribute({
			cloudevent: ce,
			name: 'originatorid',
			types: ['string', 'undefined'],
			value: originatorid || cloudevent['originatorid'],
		})

		return ce
	}

	wschannel = ({ cloudevent = {}, wschannelid }) => {
		const ce = this

		setAttribute({
			cloudevent: ce,
			name: 'wschannelid',
			types: ['string', 'undefined'],
			value: wschannelid || cloudevent['wschannelid'],
		})

		return ce
	}
}
