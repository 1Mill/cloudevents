import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import { setAttribute } from './index.js'

chai.use(sinonChai)

describe('setAttribute', () => {
	const name = 'some-name'
	let cloudevent

	beforeEach(() => {
		cloudevent = {}
		sinon.spy(console, 'warn')
	})

	afterEach(() => {
		console.warn.restore()
	})

	describe('when #deprecated is true', () => {
		it('calls console.warn with the proper warning', () => {
			setAttribute({ cloudevent, deprecated: true, name })
			const expected = `Cloudevent "${name}" is depricated`
			expect(console.warn).to.have.been.calledWith(expected)
		})
	})

	describe('when #deprecated is false', () => {
		it ('does not call console.warn', () => {
			setAttribute({ cloudevent, deprecated: false, name })
			expect(console.warn).to.have.not.been.called
		})
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
