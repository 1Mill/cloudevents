import { Cloudevent } from '../index.js'
import { expect } from 'chai'

describe('cloudevent#type', () => {
	let params

	beforeEach(() => {
		params = {
			// * Required base defaults
			source: 'some-source',
			type: 'some-type',
		}
	})

	describe('when a #type value is not input', () => {
		it('throws the proper error', () => {
			const expected = 'Cloudevent "type" must be of type STRING'
			params.type = null
			expect(() => new Cloudevent(params)).to.throw(expected)
		})
	})

	describe('when a #type value is input', () => {
		describe('when the input value is not a string', () => {
			it('throws the proper error', () => {
				const expected = 'Cloudevent "type" must be of type STRING'
				params.type = 1234
				expect(() => new Cloudevent(params)).to.throw(expected)
			})
		})

		describe('when the input value is a string', () => {
			it('returns the input value', () => {
				const { type } = new Cloudevent(params)
				expect(type).to.eq(params.type)
			})
		})
	})
})
