import { Cloudevent } from '../index.js'
import { expect } from 'chai'

describe('cloudevent#wschannelid', () => {
	let params

	beforeEach(() => {
		params = {
			// * Required base defaults
			source: 'some-source',
			type: 'some-type',
		}
	})

	describe('when #wschannelid is not input', () => {
		it('returns undefined', () => {
			const { wschannelid } = new Cloudevent(params)
			expect(wschannelid).to.be.undefined
		})
	})

	describe('when #wschannelid is input', () => {
		describe('when the input value is invalid', () => {
			it('throws the proper error', () => {
				const expected = 'Cloudevent "wschannelid" must be of type STRING or UNDEFINED'
				params.wschannelid = 1234
				expect(() => new Cloudevent(params)).to.throw(expected)
			})
		})

		describe('when the input value is valid', () => {
			it('returns the input value', () => {
				params.wschannelid = 'some-wschannel-id'
				const { wschannelid } = new Cloudevent(params)
				expect(wschannelid).to.eq(params.wschannelid)
			})
		})
	})
})
