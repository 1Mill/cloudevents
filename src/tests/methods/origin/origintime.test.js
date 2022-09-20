import { Cloudevent } from '../../../index.js'
import { expect } from 'chai'

describe('cloudevent.origin#origintime', () => {
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

	describe('when #origintime is not input', () => {
		beforeEach(() => {
			params.origintime = undefined
		})

		describe('when #cloudevent is not input', () => {
			it('throws the proper error', () => {
				const expected = 'Cloudevent "origintime" must be of type STRING'
				params.cloudevent = undefined
				expect(() => ce.origin(params)).to.throw(expected)
			})
		})

		describe('when #cloudevent is input', () => {
			describe('when #cloudevent#origintime does not exist', () => {
				beforeEach(() => {
					cloudevent.origintime = undefined
				})

				describe('when #cloudevent#time does not exist', () => {
					it('throws the proper error', () => {
						cloudevent.time = undefined
						const expected = 'Cloudevent "origintime" must be of type STRING'
						expect(() => ce.origin(params)).to.throw(expected)
					})
				})

				describe('when #cloudevent#time does exist', () => {
					it('returns the input #cloudevent#time', () => {
						ce.origin(params)
						expect(ce.origintime).to.eq(cloudevent.time)
					})
				})
			})

			describe('when #cloudevent#origintime exists', () => {
				it('returns the input #cloudevent#origintime', () => {
					const expected = 'some-new-origin-time'

					cloudevent.origintime = expected
					ce.origin(params)

					expect(ce.origintime).to.eq(expected)
				})
			})
		})
	})

	describe('when #origintime is input', () => {
		it('returns the input value', () => {
			ce.origin(params)
			expect(ce.origintime).to.eq(params.origintime)
		})
	})
})
