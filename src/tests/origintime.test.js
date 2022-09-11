import { Cloudevent } from '../index.js'
import { expect } from 'chai'

describe('cloudevent#origintime', () => {
	let params

	beforeEach(() => {
		params = {
			// * Required base defaults
			source: 'some-source',
			type: 'some-type',
		}
	})

	describe('when #origintime is not input', () => {
		it('returns #time', () => {
			const { origintime, time } = new Cloudevent(params)
			expect(origintime).to.eq(time)
		})
	})

	describe('when #origintime is input', () => {
		describe('when the input value is invalid', () => {
			it('throws the proper error', () => {
				const expected = 'Cloudevent "origintime" must be of type STRING'
				params.origintime = 1234
				expect(() => new Cloudevent(params)).to.throw(expected)
			})
		})

		describe('when the input value is valid', () => {
			it('sets cloudevent#origintime to the input value', () => {
				params.origintime = new Date().toISOString()
				const { origintime } = new Cloudevent(params)
				expect(origintime).to.eq(params.origintime)
			})
		})
	})
})
