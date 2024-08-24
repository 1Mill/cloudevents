import { Cloudevent, CloudeventProps } from '../../index.js'
import { expect } from 'chai'

describe('cloudevent#origintype', () => {
	let params: CloudeventProps

	beforeEach(() => {
		params = {
			source: 'some-source',
			type: 'some-type',
		}
	})

	describe('when #origin is not input', () => {
		beforeEach(() => { params.origin = undefined })

		it('returns #type', () => {
			const { origintype } = new Cloudevent(params)
			expect(origintype).to.eq(params.type)
		})
	})

	describe('when #origin is input', () => {
		const origin = new Cloudevent({
			source: 'some-origin-source',
			type: 'some-origin-type',
		})

		beforeEach(() => { params.origin = origin })

		it('returns origin#type', () => {
			const { origintype } = new Cloudevent(params)
			expect(origintype).to.eq(origin.origintype)
		})
	})
})
