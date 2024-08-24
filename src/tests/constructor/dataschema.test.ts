import { Cloudevent, CloudeventProps } from '../../index.js'
import { expect } from 'chai'

describe('cloudevent#dataschema', () => {
	let params: CloudeventProps

	beforeEach(() => {
		params = {
			source: 'some-source',
			type: 'some-type',
		}
	})

	describe('when #dataschema is not input', () => {
		beforeEach(() => { params.dataschema = undefined })

		it('returns undefined', () => {
			const { dataschema } = new Cloudevent(params)
			expect(dataschema).to.be.undefined
		})
	})

	describe('when #dataschema is input', () => {
		beforeEach(() => { params.dataschema = 'some-dataschema' })

		it('returns #dataschema', () => {
			const { dataschema } = new Cloudevent(params)
			expect(dataschema).to.eq(params.dataschema)
		})
	})
})
