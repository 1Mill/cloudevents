import { Cloudevent, CloudeventProps } from '../../index.js'
import { expect } from 'chai'

describe('cloudevent#datacontenttype', () => {
	let params: CloudeventProps

	beforeEach(() => {
		params = {
			source: 'some-source',
			type: 'some-type',
		}
	})

	describe('when #datacontenttype is not input', () => {
		beforeEach(() => { params.datacontenttype = undefined })

		describe('when #data is not input', () => {
			beforeEach(() => { params.data = undefined })

			it('returns undefined', () => {
				const { datacontenttype } = new Cloudevent(params)
				expect(datacontenttype).to.be.undefined
			})
		})

		describe('when #data is input', () => {
			beforeEach(() => { params.data = false })

			it('returns application/json', () => {
				const { datacontenttype } = new Cloudevent(params)
				expect(datacontenttype).to.eq('application/json')
			})
		})
	})

	describe('when #datacontenttype is input', () => {
		beforeEach(() => { params.datacontenttype = 'some-datacontenttype' })

		describe('when #data is not input', () => {
			beforeEach(() => { params.data = undefined })

			it('returns #datacontenttype', () => {
				const { datacontenttype } = new Cloudevent(params)
				expect(datacontenttype).to.eq(params.datacontenttype)
			})
		})

		describe('when #data is input', () => {
			beforeEach(() => { params.data = false })

			it('returns #datacontenttype', () => {
				const { datacontenttype } = new Cloudevent(params)
				expect(datacontenttype).to.eq(params.datacontenttype)
			})
		})
	})
})
