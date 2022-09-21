import { Cloudevent } from '../../../index.js'
import { expect } from 'chai'

describe('cloudevent.wschannel', () => {
	it('returns itself', () => {
		const ce = new Cloudevent({ source: 'some-source', type: 'some-type' })
		const origin = new Cloudevent({ source: 'source-of-origin', type: 'type-of-origin' })

		const result = ce.wschannel({ cloudevent: origin })

		expect(result).to.eq(ce)
	})
})
