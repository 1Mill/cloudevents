import { Cloudevent } from '../index.js'
import { expect } from 'chai'

describe('cloudevent#specversion', () => {
	let params

	beforeEach(() => {
		params = {
			// * Required base defaults
			source: 'some-source',
			type: 'some-type',
		}
	})

	describe('when a #specversion value is not input', () => {
		it('returns the proper value', () => {
			const expected = '1.0'
			const { specversion } = new Cloudevent(params)
			expect(specversion).to.eq(expected)
		})
	})

	describe('when a #specversion value is input', () => {
		describe('when the input value is not a string', () => {
			it('throws the proper error', () => {
				params.specversion = 1234
				const expected = 'Cloudevent "specversion" must be of type STRING'
				expect(() => new Cloudevent(params)).to.throw(expected)
			})
		})

		describe('when the input value is a string', () => {
			it('returns the input value', () => {
				const expected = '4.3.2.1'
				params.specversion = expected
				const { specversion } = new Cloudevent(params)
				expect(specversion).to.eq(expected)
			})
		})
	})
})
