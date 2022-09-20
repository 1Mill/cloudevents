import { Cloudevent } from '../../index.js'
import { createSandbox } from 'sinon'
import { expect } from 'chai'

describe('cloudevent#source', () => {
	const sandbox = createSandbox()
	let params

	beforeEach(() => {
		params = {
			// * Required base defaults
			source: 'some-source',
			type: 'some-type',
		}
	})

	afterEach(() => {
		sandbox.restore()
	})

	describe('when a #source value is not input', () => {
		beforeEach(() => {
			params.source = null
		})

		describe('when process.env.MILL_CLOUDEVENTS_SOURCE is not input', () => {
			it('throws the proper error', () => {
				const expected = 'Cloudevent "source" must be of type STRING'
				sandbox.stub(process, 'env').value({})
				expect(() => new Cloudevent(params)).to.throw(expected)
			})
		})

		describe('when process.env.MILL_CLOUDEVENTS_SOURCE is input', () => {
			it('returns the input value', () => {
				const expected = 'some-env-var-value'

				const env = { MILL_CLOUDEVENTS_SOURCE: expected }
				sandbox.stub(process, 'env').value(env)

				const { source } = new Cloudevent(params)
				expect(source).to.eq(expected)
			})
		})
	})

	describe('when a #source value is input', () => {
		describe('when the input value is not a string', () => {
			it('throws the proper error', () => {
				const expected = 'Cloudevent "source" must be of type STRING'
				params.source = 1234
				expect(() => new Cloudevent(params)).to.throw(expected)
			})
		})

		describe('when the input value is a string', () => {
			it('returns the input value', () => {
				const { source } = new Cloudevent(params)
				expect(source).to.eq(params.source)
			})
		})
	})
})
