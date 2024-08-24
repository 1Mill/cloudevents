import { Cloudevent, CloudeventProps } from '../../index.js'
import { expect } from 'chai'

describe('cloudevent#origintime', () => {
	let params: CloudeventProps

	beforeEach(() => {
		params = {
			source: 'some-source',
			type: 'some-type',
		}
	})

	describe('when #origin is not input', () => {
		beforeEach(() => { params.origin = undefined })

		it('returns #time', () => {
			const { origintime, time } = new Cloudevent(params)
			expect(origintime).to.eq(time)
		})
	})

	describe('when #origin is input', () => {
		const origin = new Cloudevent({
			source: 'some-origin-source',
			type: 'some-origin-type',
		})

		beforeEach(() => { params.origin = origin })

		it('returns origin#time', () => {
			const { origintime } = new Cloudevent(params)
			expect(origintime).to.eq(origin.origintime)
		})
	})
})
