import { Cloudevent, CloudeventProps } from '../../index.js'
import { expect } from 'chai'

describe('cloudevent#parentrootid', () => {
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
			const { id, parentrootid } = new Cloudevent(params)
			expect(parentrootid).to.eq(id)
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

		it('returns root#id', () => {
			const { parentrootid } = new Cloudevent(params)
			expect(parentrootid).to.eq(root.parentrootid)
		})
	})
})
