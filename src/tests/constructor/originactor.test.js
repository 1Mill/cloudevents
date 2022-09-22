import { Cloudevent } from '../../index.js'
import { expect } from 'chai'

describe('cloudevent#originactor', () => {
	let params

	beforeEach(() => {
		params = {
			// * Required base defaults
			source: 'some-source',
			type: 'some-type',
		}
	})

	describe('when #originactor is not input', () => {
		it('returns undefined', () => {
			const { originactor } = new Cloudevent(params)
			expect(originactor).to.be.undefined
		})
	})

	describe('when #originactor is input', () => {
		describe('when the input value is invalid', () => {
			it('throws the proper error', () => {
				const expected = 'Cloudevent "originactor" must be of type STRING or UNDEFINED'
				params.originactor = 1234
				expect(() => new Cloudevent(params)).to.throw(expected)
			})
		})

		describe('when the input value is valid', () => {
			it('returns the input value', () => {
				params.originactor = 'some-originactor'
				const { originactor } = new Cloudevent(params)
				expect(originactor).to.eq(params.originactor)
			})
		})
	})
})
