import { Cloudevent } from '../../../index.js'
import { expect } from 'chai'

describe('cloudevent.originator#originatorid', () => {
	let ce

	beforeEach(() => {
		ce = new Cloudevent({
			source: 'some-source',
			type: 'some-type',
		})
	})

	describe('when #originatorid is not input', () => {
		describe('when #cloudevent is not input', () => {
			it('returns undefined', () => {
				ce.originator({})
				expect(ce.originatorid).to.be.undefined
			})
		})

		describe('when #cloudevent is input', () => {
			describe('when #cloudevent#originatorid does not exist', () => {
				it('returns undefined', () => {
					const cloudevent = {}
					ce.originator({ cloudevent })
					expect(ce.originatorid).to.be.undefined
				})
			})

			describe('when #cloudevent#originatorid does exist', () => {
				it('returns #cloudevent#originatorid', () => {
					const expected = 'some-originator-id'

					const cloudevent = { originatorid: expected }
					ce.originator({ cloudevent })

					expect(ce.originatorid).to.eq(expected)
				})
			})
		})
	})

	describe('when #originatorid is input', () => {
		it('returns the input value', () => {
			const expected = 'some-originator-id'
			ce.originator({ originatorid: expected })
			expect(ce.originatorid).to.eq(expected)
		})
	})
})
