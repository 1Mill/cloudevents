import { Cloudevent } from '../index.js'
import { expect } from 'chai'

describe('cloudevent#origintype', () => {
	let params

	beforeEach(() => {
		params = {
			// * Required base defaults
			type: 'some-type',
			source: 'some-source',
		}
	})

	describe('when #origintype is not input', () => {
		it('returns #type', () => {
			params.origintype = null
			const { type, origintype } = new Cloudevent(params)
			expect(origintype).to.eq(type)
		})
	})

	describe('when #origintype is input', () => {
		describe('when the input value is invalid', () => {
			it('throws the proper error', () => {
				const expected = 'Cloudevent "origintype" must be of type STRING'
				params.origintype = 1234
				expect(() => new Cloudevent(params)).to.throw(expected)
			})
		})

		describe('when the input value is valtype', () => {
			it('sets cloudevent#origintype to the input value', () => {
				params.origintype = 'some-origin-type'
				const { origintype } = new Cloudevent(params)
				expect(origintype).to.eq(params.origintype)
			})
		})
	})
})
