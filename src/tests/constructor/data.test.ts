import { Cloudevent, CloudeventProps } from '../../index.js'
import { expect } from 'chai'

describe('cloudevent#data', () => {
	let params: CloudeventProps

	beforeEach(() => {
		params = {
			source: 'some-source',
			type: 'some-type',
		}
	})

	describe('when #data is not input', () => {
		beforeEach(() => { params.data = undefined })

		it('returns undefined', () => {
			const { data } = new Cloudevent(params)
			expect(data).to.be.undefined
		})
	})

	describe('when #data is input', () => {
		beforeEach(() => { params.data = 'some-data' })

		describe('when #datacontenttype is not input', () => {
			beforeEach(() => { params.datacontenttype = undefined })

			it('returns #data as JSON.stringified', () => {
				const { data } = new Cloudevent(params)
				const expected = JSON.stringify(params.data)
				expect(data).to.eq(expected)
			})
		})

		describe('when #datacontenttype is input', () => {
			beforeEach(() => { params.datacontenttype = 'some-datacontenttype' })

			it('returns #data', () => {
				const { data } = new Cloudevent(params)
				expect(data).to.eq(params.data)
			})
		})
	})
})
