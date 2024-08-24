import { Cloudevent, CloudeventProps } from '../../index.js'
import { expect } from 'chai'

describe('cloudevent#type', () => {
	let params: CloudeventProps

	beforeEach(() => {
		params = {
			source: 'some-source',
			type: 'some-type',
		}
	})

	it('returns #type', () => {
		const { type } = new Cloudevent(params)
		expect(type).to.eq(params.type)
	})
})
