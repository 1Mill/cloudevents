import { Cloudevent, CloudeventProps } from '../../index.js'
import { expect } from 'chai'
import { useFakeTimers } from 'sinon'

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
		expect(time).to.eq(expected)

		clock.restore()
	})
})
