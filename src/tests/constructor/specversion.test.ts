import { Cloudevent, CloudeventProps } from '../../index.js'
import { expect } from 'chai'

describe('cloudevent#specversion', () => {
	let params: CloudeventProps

	beforeEach(() => {
		params = {
			source: 'some-source',
			type: 'some-type',
		}
	})

	describe('when #specversion is not input', () => {
		beforeEach(() => { params.specversion = undefined })

		it('returns undefined', () => {
			const { specversion } = new Cloudevent(params)
			expect(specversion).to.eq('1.0')
		})
	})

	describe('when #specversion is input', () => {
		beforeEach(() => { params.specversion = 'some-specversion' })

		it('returns #specversion', () => {
			const { specversion } = new Cloudevent(params)
			expect(specversion).to.eq(params.specversion)
		})
	})
})
