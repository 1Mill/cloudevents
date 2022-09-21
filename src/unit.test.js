import chai, { expect } from 'chai'
import chaiIso8601 from 'chai-iso8601'
import chaiSubset from 'chai-subset'
import { Cloudevent } from './index.js'
import { useFakeTimers } from 'sinon'

chai.use(chaiIso8601)
chai.use(chaiSubset)

describe('new Cloudevent', () => {
	let clock

	beforeEach(() => {
		clock = useFakeTimers()
	})

	afterEach(() => {
		clock.restore()
	})

	describe('when the cloudevent is not enriched', () => {
		it('returns the expected cloudevent', () => {
			clock.tick(987654321) // * Jump into the future

			const data = JSON.stringify({ some: 'data' })
			const source = 'some-source'
			const time = new Date().toISOString()
			const type = 'some-type'

			const cloudevent = new Cloudevent({ data, source, type })

			clock.tick(123456789) // * Jump into the future

			expect(cloudevent).to.containSubset({
				data,
				datacontenttype: 'application/json',
				originsource: source,
				origintime: time,
				origintype: type,
				source,
				specversion: '1.0',
				time,
				type,
			})
		})
	})

	describe('when the cloudevent is enriched', () => {
		it('returns the expected cloudevent', () => {
			clock.tick(987654321) // * Jump into the future

			const origin = new Cloudevent({
				data: JSON.stringify({ some: 'data' }),
				source: 'some-origin-source',
				type: 'some-origin-type',
			})

			clock.tick(123456789) // * Jump into the future

			const source = 'some-enrichment-source'
			const time = new Date().toISOString()
			const type = 'some-enrichment-type'
			const wschannelid = 'some-wschannel-id'

			const cloudevent = new Cloudevent({ source, type })
				.origin({ cloudevent: origin })
				.wschannel({ wschannelid })

			clock.tick(987654321) // * Jump into the future

			expect(cloudevent).to.containSubset({
				data: undefined,
				datacontenttype: undefined,
				dataschema: undefined,
				originid: origin.id,
				originsource: origin.source,
				origintime: origin.time,
				origintype: origin.type,
				source,
				specversion: '1.0',
				subject: undefined,
				time,
				type,
				wschannelid,
			})
		})
	})
})
