import { createSandbox } from 'sinon'
import { expect } from 'chai'
import { fetchNodeEnv } from './index.js'

describe('fetchNodeEnv', () => {
	const name = 'SOME_NAME'
	const sandbox = createSandbox()

	afterEach(() => {
		sandbox.restore()
	})

	describe('when the node global.process is not defined', () => {
		it('returns undefined', () => {
			sandbox.stub(global, 'process').value(undefined)
			const result = fetchNodeEnv(name)
			expect(result).to.be.undefined
		})
	})

	describe('when the node global.process is defined', () => {
		describe('when the input name does not exist as an environmental variable', () => {
			describe('when a fallback value is not input', () => {
				it ('returns undefined', () => {
					sandbox.stub(process, 'env').value({})
					const result = fetchNodeEnv(name)
					expect(result).to.be.undefined
				})
			})

			describe('when a fallback value is input', () => {
				it ('returns the input fallback value', () => {
					const fallbackValue = 'some-fallback-value'

					sandbox.stub(process, 'env').value({})

					const result = fetchNodeEnv(name, fallbackValue)
					expect(result).to.eq(fallbackValue)
				})
			})
		})

		describe('when the input name exists as an environmental variable', () => {
			it('returns the proper environmental variable', () => {
				const expected = 'some-value'

				const env = { [name]: expected }
				sandbox.stub(process, 'env').value(env)

				const result = fetchNodeEnv(name, 'some-fallback-value')
				expect(result).to.eq(expected)
			})
		})
	})
})
