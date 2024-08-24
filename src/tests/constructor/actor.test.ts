import { Cloudevent, CloudeventProps } from '../../index.js'
import { expect } from 'chai'

describe('cloudevent#actor', () => {
	let params: CloudeventProps

	beforeEach(() => {
		params = {
			source: 'some-source',
			type: 'some-type',
		}
	})

	describe('when #actor is not input', () => {
		beforeEach(() => { params.actor = undefined })

		it('returns undefined', () => {
			const { actor } = new Cloudevent(params)
			expect(actor).to.be.undefined
		})
	})

	describe('when #actor is input', () => {
		beforeEach(() => { params.actor = 'some-actor' })

		it('returns #actor', () => {
			const { actor } = new Cloudevent(params)
			expect(actor).to.eq(params.actor)
		})
	})
})
