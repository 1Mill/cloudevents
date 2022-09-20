import { Cloudevent } from '../../../index.js'
import { expect } from 'chai'

describe('cloudevent.origin#originid', () => {
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

	describe('when #originid is not input', () => {
		beforeEach(() => {
			params.originid = undefined
		})

		describe('when #cloudevent is not input', () => {
			it('throws the proper error', () => {
				params.cloudevent = undefined
				const expected = 'Cloudevent "originid" must be of type STRING'
				expect(() => ce.origin(params)).to.throw(expected)
			})
		})

		describe('when #cloudevent is input', () => {
			describe('when #cloudevent#originid does not exist', () => {
				beforeEach(() => {
					cloudevent.originid = undefined
				})

				describe('when #cloudevent#id does not exist', () => {
					it('throws the proper error', () => {
						cloudevent.id = undefined
						const expected = 'Cloudevent "originid" must be of type STRING'
						expect(() => ce.origin(params)).to.throw(expected)
					})
				})

				describe('when #cloudevent#id does exist', () => {
					it('returns the input #cloudevent#id', () => {
						ce.origin(params)
						expect(ce.originid).to.eq(cloudevent.id)
					})
				})
			})

			describe('when #cloudevent#originid exists', () => {
				it('returns the input #cloudevent#originid', () => {
					const expected = 'some-new-origin-id'

					cloudevent.originid = expected
					ce.origin(params)

					expect(ce.originid).to.eq(expected)
				})
			})
		})
	})

	describe('when #originid is input', () => {
		it('returns the input value', () => {
			ce.origin(params)
			expect(ce.originid).to.eq(params.originid)
		})
	})
})
