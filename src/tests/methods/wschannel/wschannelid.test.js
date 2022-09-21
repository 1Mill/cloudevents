import { Cloudevent } from '../../../index.js'
import { expect } from 'chai'

describe('cloudevent.wschannel#wschannelid', () => {
	let ce

	beforeEach(() => {
		ce = new Cloudevent({
			source: 'some-source',
			type: 'some-type',
		})
	})

	describe('when #wschannelid is not input', () => {
		describe('when #cloudevent is not input', () => {
			it('returns undefined', () => {
				ce.wschannel({})
				expect(ce.wschannelid).to.be.undefined
			})
		})

		describe('when #cloudevent is input', () => {
			describe('when #cloudevent#wschannelid does not exist', () => {
				it('returns undefined', () => {
					const cloudevent = {}
					ce.wschannel({ cloudevent })
					expect(ce.wschannelid).to.be.undefined
				})
			})

			describe('when #cloudevent#wschannelid does exist', () => {
				it('returns #cloudevent#wschannelid', () => {
					const expected = 'some-wschannel-id'

					const cloudevent = { wschannelid: expected }
					ce.wschannel({ cloudevent })

					expect(ce.wschannelid).to.eq(expected)
				})
			})
		})
	})

	describe('when #wschannelid is input', () => {
		it('returns the input value', () => {
			const expected = 'some-wschannel-id'
			ce.wschannel({ wschannelid: expected })
			expect(ce.wschannelid).to.eq(expected)
		})
	})
})
