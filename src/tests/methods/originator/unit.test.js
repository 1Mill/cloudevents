import { Cloudevent } from '../../../index.js'
import { expect } from 'chai'

describe('cloudevent.originator', () => {
	it('returns itself', () => {
		const ce = new Cloudevent({ source: 'some-source', type: 'some-type' })
		const result = ce.originator({ originatorid: 'some-originator-id' })
		expect(result).to.eq(ce)
	})
})
