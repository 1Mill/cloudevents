import { Cloudevent, CloudeventProps } from '../../index.js'
import { expect } from 'chai'

describe('cloudevent#parentid', () => {
	let params: CloudeventProps

	beforeEach(() => {
		params = {
			source: 'some-source',
			type: 'some-type',
		}
	})

	describe('when #parent is not input', () => {
		beforeEach(() => { params.parent = undefined })

		it('returns #id', () => {
			const { parentid } = new Cloudevent(params)
			expect(parentid).to.eq(undefined)
		})
	})

	describe('when #parent is input', () => {
		const root = new Cloudevent({
			source: 'some-root-source',
			type: 'some-root-type',
		})

		const parent = new Cloudevent({
			parent: root,
			source: 'some-parent-source',
			type: 'some-parent-type',
		})

		beforeEach(() => { params.parent = parent })

		it('returns parent#id', () => {
			const { parentid } = new Cloudevent(params)
			expect(parentid).to.eq(parent.id)
		})
	})
})
