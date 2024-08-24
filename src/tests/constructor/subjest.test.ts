import { Cloudevent, CloudeventProps } from '../../index.js'
import { expect } from 'chai'

describe('cloudevent#subject', () => {
	let params: CloudeventProps

	beforeEach(() => {
		params = {
			source: 'some-source',
			type: 'some-type',
		}
	})

	describe('when #subject is not input', () => {
		beforeEach(() => { params.subject = undefined })

		it('returns undefined', () => {
			const { subject } = new Cloudevent(params)
			expect(subject).to.be.undefined
		})
	})

	describe('when #subject is input', () => {
		beforeEach(() => { params.subject = 'some-subject' })

		it('returns #subject', () => {
			const { subject } = new Cloudevent(params)
			expect(subject).to.eq(params.subject)
		})
	})
})
