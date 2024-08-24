import { Cloudevent, CloudeventProps } from '../../index.js'
import { createSandbox } from 'sinon'
import { expect } from 'chai'

describe('cloudevent#source', () => {
	const sandbox = createSandbox()
	let params: CloudeventProps

	beforeEach(() => { params = { type: 'some-type' } })

	afterEach(() => { sandbox.restore() })

	describe('when #source is not input', () => {
		beforeEach(() => { params.source = undefined })

		describe('when process.env.MILL_CLOUDEVENTS_SOURCE is not input', () => {
			it('throws the proper error', () => {
				sandbox.stub(process, 'env').value({})
				const expected = 'Cloudevent "source" must be of type STRING'
				expect(() => new Cloudevent(params)).to.throw(expected)
			})
		})

		describe('when process.env.MILL_CLOUDEVENTS_SOURCE is input', () => {
			it('returns process.env.MILL_CLOUDEVENTS_SOURCE', () => {
				const expected = 'some-env-var-value'

				const env = { MILL_CLOUDEVENTS_SOURCE: expected }
				sandbox.stub(process, 'env').value(env)

				const { source } = new Cloudevent(params)
				expect(source).to.eq(expected)
			})
		})
	})

	describe('when #source is input', () => {
		beforeEach(() => { params.source = 'some-source' })

		it('returns the input value', () => {
			const { source } = new Cloudevent(params)
			expect(source).to.eq(params.source)
		})
	})
})
