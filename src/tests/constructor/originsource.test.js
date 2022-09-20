import { Cloudevent } from '../../index.js'
import { expect } from 'chai'

describe('cloudevent#originsource', () => {
	let params

	beforeEach(() => {
		params = {
			// * Required base defaults
			source: 'some-source',
			type: 'some-type',
		}
	})

	describe('when #originsource is not input', () => {
		it('returns #source', () => {
			params.originsource = null
			const { source, originsource } = new Cloudevent(params)
			expect(originsource).to.eq(source)
		})
	})

	describe('when #originsource is input', () => {
		describe('when the input value is invalid', () => {
			it('throws the proper error', () => {
				const expected = 'Cloudevent "originsource" must be of type STRING'
				params.originsource = 1234
				expect(() => new Cloudevent(params)).to.throw(expected)
			})
		})

		describe('when the input value is valid', () => {
			it('returns the input value', () => {
				params.originsource = 'some-origin-source'
				const { originsource } = new Cloudevent(params)
				expect(originsource).to.eq(params.originsource)
			})
		})
	})
})
