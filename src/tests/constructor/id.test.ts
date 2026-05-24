import { Cloudevent, CloudeventProps } from '../../index.js'
import { expect } from 'chai'

describe('cloudevent#id', () => {
	let params: CloudeventProps

	beforeEach(() => {
		params = {
			source: 'some-source',
			type: 'some-type',
		}
	})

	it('returns with a "ce_" prefix', () => {
		const { id } = new Cloudevent(params)
		const prefix = id.slice(0, 3)
		expect(prefix).to.eq('ce_')
	})

	it('returns with a length of 39', () => {
		const { id } = new Cloudevent(params)
		expect(id).to.have.lengthOf(39)
	})
})
