import { Cloudevent } from '../../../index.js'
import { expect } from 'chai'

describe('cloudevent.origin#origintype', () => {
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

	describe('when #origintype is not input', () => {
		beforeEach(() => {
			params.origintype = undefined
		})

		describe('when #cloudevent is not input', () => {
			it('throws the proper error', () => {
				params.cloudevent = undefined
				const expected = 'Cloudevent "origintype" must be of type STRING'
				expect(() => ce.origin(params)).to.throw(expected)
			})
		})

		describe('when #cloudevent is input', () => {
			describe('when #cloudevent#origintype does not exist', () => {
				beforeEach(() => {
					cloudevent.origintype = undefined
				})

				describe('when #cloudevent#type does not exist', () => {
					it('throws the proper error', () => {
						cloudevent.type = undefined
						const expected = 'Cloudevent "origintype" must be of type STRING'
						expect(() => ce.origin(params)).to.throw(expected)
					})
				})

				describe('when #cloudevent#type does exist', () => {
					it('returns the input #cloudevent#type', () => {
						ce.origin(params)
						expect(ce.origintype).to.eq(cloudevent.type)
					})
				})
			})

			describe('when #cloudevent#origintype exists', () => {
				it('returns the input #cloudevent#origintype', () => {
					const expected = 'some-new-origin-type'

					cloudevent.origintype = expected
					ce.origin(params)

					expect(ce.origintype).to.eq(expected)
				})
			})
		})
	})

	describe('when #origintype is input', () => {
		it('returns the input value', () => {
			ce.origin(params)
			expect(ce.origintype).to.eq(params.origintype)
		})
	})
})
