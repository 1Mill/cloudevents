import chai, { expect } from 'chai'
import chaiString from 'chai-string'
import { Cloudevent, CloudeventProps } from '../../index.js'

chai.use(chaiString)

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
		expect(id).to.startWith('ce_')
	})

	it('returns with a length of 39', () => {
		const { id } = new Cloudevent(params)
		expect(id).to.have.lengthOf(39)
	})
})
