import { Cloudevent } from '../../../index.js'
import { expect } from 'chai'

describe('cloudevent.origin#originsource', () => {
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

	describe('when #originsource is not input', () => {
		beforeEach(() => {
			params.originsource = undefined
		})

		describe('when #cloudevent is not input', () => {
			it('throws the proper error', () => {
				const expected = 'Cloudevent "originsource" must be of type STRING'
				params.cloudevent = undefined
				expect(() => ce.origin(params)).to.throw(expected)
			})
		})

		describe('when #cloudevent is input', () => {
			describe('when #cloudevent#originsource does not exist', () => {
				beforeEach(() => {
					cloudevent.originsource = undefined
				})

				describe('when #cloudevent#source does not exist', () => {
					it('throws the proper error', () => {
						cloudevent.source = undefined
						const expected = 'Cloudevent "originsource" must be of type STRING'
						expect(() => ce.origin(params)).to.throw(expected)
					})
				})

				describe('when #cloudevent#source does exist', () => {
					it('returns the input #cloudevent#source', () => {
						ce.origin(params)
						expect(ce.originsource).to.eq(cloudevent.source)
					})
				})
			})

			describe('when #cloudevent#originsource exists', () => {
				it('returns the input #cloudevent#originsource', () => {
					const expected = 'some-new-origin-source'

					cloudevent.originsource = expected
					ce.origin(params)

					expect(ce.originsource).to.eq(expected)
				})
			})
		})
	})

	describe('when #originsource is input', () => {
		it('returns the input value', () => {
			ce.origin(params)
			expect(ce.originsource).to.eq(params.originsource)
		})
	})
})
