import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import { Permitted, validateAttribute } from './validateAttribute.js'

chai.use(sinonChai)

describe('validateAttribute', () => {
	const name = 'some-name'

	beforeEach(() => {
		sinon.spy(console, 'warn')
	})

	afterEach(() => {
		// @ts-ignore because I don't know or really care to fix this at the moment.
		console.warn.restore()
	})

	describe('when #deprecated is true', () => {
		it('calls console.warn with the proper warning', () => {
			validateAttribute({ deprecated: true, name, value: 'some-value' })
			const expected = `Cloudevent "${name}" is depricated`
			expect(console.warn).to.have.been.calledWith(expected)
		})
	})

	describe('when #deprecated is false', () => {
		it ('does not call console.warn', () => {
			validateAttribute({ deprecated: false, name, value: 'some-value'})
			expect(console.warn).to.have.not.been.called
		})
	})

	describe('when #permitted is empty', () => {
		[1234, '1234', undefined].forEach(value => {
			it('returns the input #value', () => {
				const result = validateAttribute({ name, value })
				expect(result).to.eq(value)
			})
		})
	})

	describe('when #permitted is not empty', () => {
		describe('when the type of #value is not in #permitted', () => {
			it('throws the proper error', () => {
				const permitted = [Permitted.STRING, Permitted.UNDEFINED]
				const value = 1234

				const expected = `Cloudevent "${name}" must be of type STRING or UNDEFINED`

				expect(() => validateAttribute({ name, permitted, value })).to.throw(expected)
			})
		})

		describe('when the type of #value is in #permitted', () => {
			[1234, undefined].forEach(value => {
				it('returns the input #value', () => {
					const permitted = [Permitted.NUMBER, Permitted.UNDEFINED]
					const result = validateAttribute({ name, permitted, value })
					expect(result).to.eq(value)
				})
			})
		})
	})
})
