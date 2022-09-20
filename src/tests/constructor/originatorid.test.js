import { Cloudevent } from '../../index.js'
import { expect } from 'chai'

describe('cloudevent#originatorid', () => {
	let params

	beforeEach(() => {
		params = {
			// * Required base defaults
			source: 'some-source',
			type: 'some-type',
		}
	})

	describe('when #originatorid is not input', () => {
		it('returns undefined', () => {
			const { originatorid } = new Cloudevent(params)
			expect(originatorid).to.be.undefined
		})
	})

	describe('when #originatorid is input', () => {
		describe('when the input value is invalid', () => {
			it('throws the proper error', () => {
				const expected = 'Cloudevent "originatorid" must be of type STRING or UNDEFINED'
				params.originatorid = 1234
				expect(() => new Cloudevent(params)).to.throw(expected)
			})
		})

		describe('when the input value is valid', () => {
			it('returns the input value', () => {
				params.originatorid = 'some-originator-id'
				const { originatorid } = new Cloudevent(params)
				expect(originatorid).to.eq(params.originatorid)
			})
		})
	})
})
