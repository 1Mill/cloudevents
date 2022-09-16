import { Cloudevent } from '../index.js'
import { expect } from 'chai'

describe('cloudevent#subject', () => {
	let params

	beforeEach(() => {
		params = {
			// * Required base defaults
			source: 'some-source',
			type: 'some-type',
		}
	})

	describe('when #subject is not input', () => {
		it('returns undefined', () => {
			const { subject } = new Cloudevent(params)
			expect(subject).to.be.undefined
		})
	})

	describe('when #subject is not input', () => {
		describe('when the input value is invalid', () => {
			it('throws the proper error', () => {
				const expected = 'Cloudevent "subject" must be of type STRING or UNDEFINED'
				params.subject = 1234
				expect(() => new Cloudevent(params)).to.throw(expected)
			})
		})

		describe('when the input value is valid', () => {
			it('returns the input value', () => {
				params.subject = 'some-string'
				const { subject } = new Cloudevent(params)
				expect(subject).to.eq(params.subject)
			})
		})
	})
})
