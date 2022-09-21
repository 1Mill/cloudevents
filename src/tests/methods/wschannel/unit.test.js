import { Cloudevent } from '../../../index.js'
import { expect } from 'chai'

describe('cloudevent.wschannel', () => {
	it('returns itself', () => {
		const ce = new Cloudevent({ source: 'some-source', type: 'some-type' })
		const result = ce.wschannel({ wschannelid: 'some-wschannel-id' })
		expect(result).to.eq(ce)
	})
})
