import { Cloudevent } from './cloudevent.js'
import { SinonFakeTimers, useFakeTimers } from 'sinon'
import { expect } from 'chai'

describe('new Cloudevent', () => {
	let clock: SinonFakeTimers

	beforeEach(() => {
		clock = useFakeTimers()
	})

	afterEach(() => {
		clock.restore()
	})

	describe('when the cloudevent is the root', () => {
		it('returns the expected cloudevent', () => {
			clock.tick(987654321) // * Jump into the future

			const actor = 'some-actor#1234'
			const data = 1234
			const datacontenttype = 'my-custom-content-type'
			const source = 'some-source'
			const time = new Date().toISOString()
			const type = 'some-type'

			const {id, ...partialCloudevent} = new Cloudevent({ actor, data, datacontenttype, source, type })

			clock.tick(123456789) // * Jump into the future

			expect(partialCloudevent).to.deep.eq({
				actor,
				data,
				datacontenttype,
				dataschema: undefined,
				parentid: undefined,
				parentrootid: id,
				source,
				specversion: '1.0',
				subject: undefined,
				time,
				type,
				wschannelid: undefined,
			})
		})
	})

	describe('when the cloudevent is not the root', () => {
		it('returns the expected cloudevent', () => {
			clock.tick(987654321) // * Jump into the future

			const root = new Cloudevent({
				actor: 'some-root-actor',
				source: 'some-root-source',
				type: 'some-root-type',
			})

			const parent = new Cloudevent({
				parent: root,
				source: 'some-parent-source',
				type: 'some-parent-type',
			})

			clock.tick(123456789) // * Jump into the future

			const actor = 'some-actor#1234'
			const data = { some: 'data' }
			const source = 'some-enrichment-source'
			const time = new Date().toISOString()
			const type = 'some-enrichment-type'
			const wschannelid = 'some-wschannel-id'

			const {id, ...partialCloudevent} = new Cloudevent({ actor, data, parent, source, type, wschannelid })

			clock.tick(987654321) // * Jump into the future

			expect(partialCloudevent).to.deep.eq({
				actor,
				data: JSON.stringify(data),
				datacontenttype: 'application/json',
				dataschema: undefined,
				parentid: parent.id,
				parentrootid: root.id,
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
