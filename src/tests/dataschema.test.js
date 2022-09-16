import { Cloudevent } from '../index.js'
import { expect } from 'chai'

describe('cloudevent#dataschema', () => {
	let params

	beforeEach(() => {
		params = {
			// * Required base defaults
			source: 'some-source',
			type: 'some-type',
		}
	})

	describe('when #dataschema is not input', () => {
		it('returns undefined', () => {
			const { dataschema } = new Cloudevent(params)
			expect(dataschema).to.be.undefined
		})
	})

	describe('when #dataschema is input', () => {
		describe('when the input value is invalid', () => {
			it('throws the proper error', () => {
				const expected = 'Cloudevent "dataschema" must be of type STRING or UNDEFINED'
				params.dataschema = 1234
				expect(() => new Cloudevent(params)).to.throw(expected)
			})
		})

		describe('when the input value is valid', () => {
			it('returns the input value', () => {
				params.dataschema = 'some-string'
				const { dataschema } = new Cloudevent(params)
				expect(dataschema).to.eq(params.dataschema)
			})
		})
	})
})
