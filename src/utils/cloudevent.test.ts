import chai, { expect } from 'chai'
import chaiIso8601 from 'chai-iso8601'
import chaiSubset from 'chai-subset'
import { Cloudevent } from './cloudevent.js'
import { SinonFakeTimers, useFakeTimers } from 'sinon'

chai.use(chaiIso8601)
chai.use(chaiSubset)

describe('new Cloudevent', () => {
	let clock: SinonFakeTimers

	beforeEach(() => {
		clock = useFakeTimers()
	})

	afterEach(() => {
		clock.restore()
	})

	describe('when the cloudevent is not the origin', () => {
		it('returns the expected cloudevent', () => {
			clock.tick(987654321) // * Jump into the future

			const actor = 'some-actor#1234'
			const data = 1234
			const datacontenttype = 'my-custom-content-type'
			const source = 'some-source'
			const time = new Date().toISOString()
			const type = 'some-type'

			const cloudevent = new Cloudevent({ actor, data, datacontenttype, source, type })

			clock.tick(123456789) // * Jump into the future

			expect(cloudevent).to.containSubset({
				actor,
				data,
				datacontenttype,
				dataschema: undefined,
				originid: cloudevent.id,
				originsource: source,
				origintime: time,
				origintype: type,
				source,
				specversion: '1.0',
				subject: undefined,
				time,
				type,
				wschannelid: undefined,
			})
		})
	})

	describe('when the cloudevent is the origin', () => {
		it('returns the expected cloudevent', () => {
			clock.tick(987654321) // * Jump into the future

			const origin = new Cloudevent({
				actor: 'some-origin-actor',
				source: 'some-origin-source',
				type: 'some-origin-type',
			})

			clock.tick(123456789) // * Jump into the future

			const actor = 'some-actor#1234'
			const data = { some: 'data' }
			const source = 'some-enrichment-source'
			const time = new Date().toISOString()
			const type = 'some-enrichment-type'
			const wschannelid = 'some-wschannel-id'

			const cloudevent = new Cloudevent({ actor, data, origin, source, type, wschannelid })

			clock.tick(987654321) // * Jump into the future

			expect(cloudevent).to.containSubset({
				actor,
				data: JSON.stringify(data),
				datacontenttype: 'application/json',
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
