import chai, { expect } from 'chai'
import chaiIso8601 from 'chai-iso8601'
import { Cloudevent } from '../index.js'
import { useFakeTimers } from 'sinon'

chai.use(chaiIso8601())

describe('cloudevent#time', () => {
	let params

	beforeEach(() => {
		params = {
			// * Required base defaults
			source: 'some-source',
			type: 'some-type',
		}
	})

	it('returns a string', () => {
		const { time } = new Cloudevent(params)
		expect(time).to.be.a('string')
	})

	it('returns the current time formatted in ISO8601', () => {
		const clock = useFakeTimers()

		clock.tick(987654321) // * Jump into the future
		const expected = new Date().toISOString()
		const { time } = new Cloudevent(params)

		clock.tick(123456789) // * Jump into the future
		expect(time).to.be.iso8601('eq', expected)

		clock.restore()
	})
})
