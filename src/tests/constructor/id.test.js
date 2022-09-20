import { Cloudevent } from '../../index.js'
import { createSandbox } from 'sinon'
import { expect } from 'chai'

describe('cloudevent#id', () => {
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

	it('returns a string', () => {
		const { id } = new Cloudevent(params)
		expect(id).to.be.a('string')
	})

	describe('when process.env.MILL_CLOUDEVENTS_NANOID_LENGTH is not input', () => {
		it('returns a string with the proper length', () => {
			sandbox.stub(process, 'env').value({})
			const { id } = new Cloudevent(params)
			expect(id).to.have.lengthOf(21)
		})
	})

	describe('when process.env.MILL_CLOUDEVENTS_NANOID_LENGTH is input', () => {
		it('returns a string with the proper length', () => {
			const expected = 123

			const env = { MILL_CLOUDEVENTS_NANOID_LENGTH: expected }
			sandbox.stub(process, 'env').value(env)

			const { id } = new Cloudevent(params)
			expect(id).to.have.lengthOf(expected)
		})
	})
})
