import { Cloudevent } from '../index.js'
import { expect } from 'chai'

describe('cloudevent#data', () => {
	let params

	beforeEach(() => {
		params = {
			// * Required base defaults
			source: 'some-source',
			type: 'some-type',
		}
	})

	describe('when a #data value is not input', () => {
		it('returns undefined', () => {
			const { data } = new Cloudevent(params)
			expect(data).to.be.undefined
		})
	})

	describe('when a #data value is input', () => {
		it('returns the input value', () => {
			params.data = JSON.stringify({ someData: 'yes' })
			const { data } = new Cloudevent(params)
			expect(data).to.eq(params.data)
		})
	})
})
