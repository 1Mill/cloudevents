import { Cloudevent } from '../../../index.js'
import { expect } from 'chai'

describe('cloudevent.origin#originactor', () => {
	let ce
	let cloudevent
	let params

	beforeEach(() => {
		// Cloudevent we are acting on
		ce = new Cloudevent({
			source: 'some-source',
			type: 'some-type',
		})

		// Cloudevent we are treating as the origin
		cloudevent = new Cloudevent({
			source: 'source-of-origin-cloudevent',
			type: 'type-of-origin-cloudevent',
		})

		params = {
			cloudevent,
			originid: 'some-origin-id',
			originsource: 'some-origin-source',
			origintime: 'some-origin-time',
			origintype: 'some-origin-type',
		}
	})


	describe('when #originactor is not input', () => {
		beforeEach(() => {
			params.originactor = undefined
		})

		describe('when #cloudevent is not input', () => {
			it('returns undefined', () => {
				params.cloudevent = undefined
				ce.origin(params)
				expect(ce.originactor).to.be.undefined
			})
		})

		describe('when #cloudevent is input', () => {
			describe('when #cloudevent#originactor does not exist', () => {
				it('returns undefined', () => {
					cloudevent.originactor = undefined
					ce.origin({ cloudevent })
					expect(ce.originactor).to.be.undefined
				})
			})

			describe('when #cloudevent#originactor does exist', () => {
				it('returns #cloudevent#originactor', () => {
					const expected = 'some-originactor'

					cloudevent.originactor = expected
					ce.origin({ cloudevent })

					expect(ce.originactor).to.eq(expected)
				})
			})
		})
	})

	describe('when #originactor is input', () => {
		it('returns the input value', () => {
			const expected = 'some-originactor'
			ce.origin({ cloudevent, originactor: expected })
			expect(ce.originactor).to.eq(expected)
		})
	})
})
