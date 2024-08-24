import chai, { expect } from 'chai'
import chaiIso8601 from 'chai-iso8601'
import { Cloudevent, CloudeventProps } from '../../index.js'
import { useFakeTimers } from 'sinon'

chai.use(chaiIso8601())

describe('cloudevent#time', () => {
	let params: CloudeventProps

	beforeEach(() => {
		params = {
			source: 'some-source',
			type: 'some-type',
		}
	})

	it('returns the current datetime in ISO8601 format', () => {
		const clock = useFakeTimers()

		clock.tick(987654321) // * Jump into the future
		const expected = new Date().toISOString()
		const { time } = new Cloudevent(params)

		clock.tick(123456789) // * Jump into the future
		// @ts-ignore because I don't know or really care to fix this at the moment.
		expect(time).to.be.iso8601('eq', expected)

		clock.restore()
	})
})
