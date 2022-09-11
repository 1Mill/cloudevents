import { Cloudevent } from '../index.js'
import { expect } from 'chai'

describe('cloudevent#originid', () => {
	let params

	beforeEach(() => {
		params = {
			// * Required base defaults
			source: 'some-source',
			type: 'some-type',
		}
	})

	describe('when #originid is not input', () => {
		it('returns #id', () => {
			params.originid = null
			const { id, originid } = new Cloudevent(params)
			expect(originid).to.eq(id)
		})
	})

	describe('when #originid is input', () => {
		describe('when the input value is invalid', () => {
			it('throws the proper error', () => {
				const expected = 'Cloudevent "originid" must be of type STRING'
				params.originid = 1234
				expect(() => new Cloudevent(params)).to.throw(expected)
			})
		})

		describe('when the input value is valid', () => {
			it('sets cloudevent#originid to the input value', () => {
				params.originid = 'some-origin-id'
				const { originid } = new Cloudevent(params)
				expect(originid).to.eq(params.originid)
			})
		})
	})
})
