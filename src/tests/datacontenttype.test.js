import { Cloudevent } from '../index.js'
import { expect } from 'chai'

describe('cloudevent#datacontenttype', () => {
	let params

	beforeEach(() => {
		params = {
			// * Required base defaults
			source: 'some-source',
			type: 'some-type',
		}
	})

	describe('when a #data value is not input', () => {
		describe('when #datacontenttype is not input', () => {
			it('returns undefined', () => {
				const { datacontenttype } = new Cloudevent(params)
				expect(datacontenttype).to.be.undefined
			})
		})

		describe('when #datacontenttype is input', () => {
			const validValues = ['some-string', undefined]

			validValues.forEach(value => {
				describe(`when #datacontenttype is a ${typeof value}`, () => {
					it('returns the input value', () => {
						params.datacontenttype = value
						const { datacontenttype } = new Cloudevent(params)
						expect(datacontenttype).to.eq(params.datacontenttype)
					})
				})
			})

			describe(`when #datacontenttype is not of type ${validValues.map(item => typeof item).join(' or ')}`, () => {
				it('throws the proper error', () => {
					const expected = `Cloudevent "datacontenttype" must be of type STRING or UNDEFINED`
					params.datacontenttype = 1234
					expect(() => new Cloudevent(params)).to.throw(expected)
				})
			})
		})
	})

	describe('when a #data value is input', () => {
		describe('when #datacontenttype is not input', () => {
			it('returns "application/json"', () => {
				params.data = JSON.stringify({ some: 'data' })
				const { datacontenttype } = new Cloudevent(params)
				expect(datacontenttype).to.eq('application/json')
			})
		})

		describe('when #datacontenttype is input', () => {
			const validValues = ['some-string', undefined]

			validValues.forEach(value => {
				describe(`when #datacontenttype is a ${typeof value}`, () => {
					it('returns the input value', () => {
						params.datacontenttype = value
						const { datacontenttype } = new Cloudevent(params)
						expect(datacontenttype).to.eq(params.datacontenttype)
					})
				})
			})

			describe(`when #datacontenttype is not of type ${validValues.map(item => typeof item).join(' or ')}`, () => {
				it('throws the proper error', () => {
					const expected = `Cloudevent "datacontenttype" must be of type STRING or UNDEFINED`
					params.datacontenttype = 1234
					expect(() => new Cloudevent(params)).to.throw(expected)
				})
			})
		})
	})
})
