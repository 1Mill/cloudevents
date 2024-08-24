import { Cloudevent, CloudeventProps } from '../../index.js'
import { expect } from 'chai'

describe('cloudevent#originsource', () => {
	let params: CloudeventProps

	beforeEach(() => {
		params = {
			source: 'some-source',
			type: 'some-type',
		}
	})

	describe('when #origin is not input', () => {
		beforeEach(() => { params.origin = undefined })

		it('returns #source', () => {
			const { originsource } = new Cloudevent(params)
			expect(originsource).to.eq(params.source)
		})
	})

	describe('when #origin is input', () => {
		const origin = new Cloudevent({
			source: 'some-origin-source',
			type: 'some-origin-type',
		})

		beforeEach(() => { params.origin = origin })

		it('returns origin#source', () => {
			const { originsource } = new Cloudevent(params)
			expect(originsource).to.eq(origin.originsource)
		})
	})
})
