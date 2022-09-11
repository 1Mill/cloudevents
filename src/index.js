import { fetchNodeEnv } from './utils/fetchNodeEnv/index.js'
import { nanoid } from 'nanoid'
import { setAttribute } from './utils/setAttribute/index.js'

export class Cloudevent {
	constructor({
		data,
		datacontenttype,
		dataschema,
		originatorid,
		originid,
		originsource,
		origintime,
		origintype,
		source,
		specversion,
		subject,
		type,
	}) {
		const cloudevent = this

		// *******
		// * Required fields by Cloudevent v1 specification
		const idValue = nanoid(fetchNodeEnv('MILL_CLOUDEVENTS_NANOID_LENGTH', 21))
		setAttribute({ cloudevent, name: 'id', types: ['string'], value: idValue })

		const sourceValue = source || fetchNodeEnv('MILL_CLOUDEVENTS_SOURCE')
		setAttribute({ cloudevent, name: 'source', types: ['string'], value: sourceValue })

		const typeValue = type
		setAttribute({ cloudevent, name: 'type', types: ['string'], value: typeValue })

		const specversionValue = specversion || '1.0'
		setAttribute({ cloudevent, name: 'specversion', types: ['string'], value: specversionValue })

		const timeValue = new Date().toISOString()
		setAttribute({ cloudevent, name: 'time', types: ['string'], value: timeValue })
		// *******

		// *******
		// * Optional fields by Cloudevent v1 specification
		setAttribute({ cloudevent, name: 'data', value: data })

		const datacontenttypeValue = typeof data !== 'undefined'
			? datacontenttype || 'application/json'
			: datacontenttype
		setAttribute({ cloudevent, name: 'datacontenttype', types: ['string', 'undefined'], value: datacontenttypeValue })

		setAttribute({ cloudevent, name: 'dataschema', types: ['string', 'undefined'], value: dataschema })

		setAttribute({ cloudevent, name: 'subject', types: ['string', 'undefined'], value: subject })
		// *******

		// *******
		// * Required in-house extentions
		const origintimeValue = origintime || timeValue
		setAttribute({ cloudevent, name: 'origintime', types: ['string'], value: origintimeValue })

		const originidValue = originid || idValue
		setAttribute({ cloudevent, name: 'originid', types: ['string'], value: originidValue })

		const originsourceValue = originsource || sourceValue
		setAttribute({ cloudevent, name: 'originsource', types: ['string'], value: originsourceValue })

		const origintypeValue = origintype || typeValue
		setAttribute({ cloudevent, name: 'origintype', types: ['string'], value: origintypeValue })
		// *******

		// *******
		// * Optional in-house extentions
		setAttribute({ cloudevent, name: 'originatorid', types: ['string', 'undefined'], value: originatorid })
		// *******
	}
}
