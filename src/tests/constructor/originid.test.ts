import { Cloudevent, CloudeventProps } from '../../index.js'
import { expect } from 'chai'

describe('cloudevent#originid', () => {
	let params: CloudeventProps

	beforeEach(() => {
		params = {
			source: 'some-source',
			type: 'some-type',
		}
	})

	describe('when #origin is not input', () => {
		beforeEach(() => { params.origin = undefined })

		it('returns #id', () => {
			const { id, originid } = new Cloudevent(params)
			expect(originid).to.eq(id)
		})
	})

	describe('when #origin is input', () => {
		const origin = new Cloudevent({
			source: 'some-origin-source',
			type: 'some-origin-type',
		})

		beforeEach(() => { params.origin = origin })

		it('returns origin#id', () => {
			const { originid } = new Cloudevent(params)
			expect(originid).to.eq(origin.originid)
		})
	})
})
