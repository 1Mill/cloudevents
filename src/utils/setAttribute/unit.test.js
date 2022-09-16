import { setAttribute } from './index.js'
import { expect } from 'chai'

describe('setAttribute', () => {
	const name = 'some-name'
	let cloudevent

	beforeEach(() => {
		cloudevent = {}
	})

	describe('when #types is empty', () => {
		[1234, '1234', undefined].forEach(value => {
			it('sets cloudevent[#name] to the input #value', () => {
				setAttribute({ cloudevent, name, value })
				expect(cloudevent[name]).to.eq(value)
			})
		})
	})

	describe('when #types is not empty', () => {
		describe('when the type of #value is not in #types', () => {
			it('throws the proper error', () => {
				const types = ['undefined', 'string']
				const value = 1234

				const expected = `Cloudevent "${name}" must be of type STRING or UNDEFINED`

				expect(() => setAttribute({ cloudevent, name, types, value })).to.throw(expected)
			})
		})

		describe('when the type of #value is in #types', () => {
			[1234, undefined].forEach(value => {
				it('sets cloudevent[#name] to the input #value', () => {
					const types = ['number', 'undefined']
					setAttribute({ cloudevent, name, types, value })
					expect(cloudevent[name]).to.eq(value)
				})
			})
		})
	})
})
