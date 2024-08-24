import { Cloudevent, CloudeventProps } from '../../index.js'
import { expect } from 'chai'

describe('cloudevent#wschannelid', () => {
	let params: CloudeventProps

	beforeEach(() => {
		params = {
			source: 'some-source',
			type: 'some-type',
		}
	})

	describe('when #wschannelid is not input', () => {
		beforeEach(() => { params.wschannelid = undefined })

		it('returns undefined', () => {
			const { wschannelid } = new Cloudevent(params)
			expect(wschannelid).to.be.undefined
		})
	})

	describe('when #wschannelid is input', () => {
		beforeEach(() => { params.wschannelid = 'some-wschannelid' })

		it('returns #wschannelid', () => {
			const { wschannelid } = new Cloudevent(params)
			expect(wschannelid).to.eq(params.wschannelid)
		})
	})
})
