import type { Signal } from '@preact/signals-core'
import { signal } from '@preact/signals-core'
import diode from './diode'

let upstream: Signal<number>
let result: ReturnType<typeof diode<number | null>>

beforeEach(() => {
	upstream = signal(8)
	result = diode<number | null>(upstream)
})

it('follows updates from upstream', () => {
	upstream.value = 9
	expect(result.value).toBe(9)

	upstream.value = 10
	expect(result.value).toBe(10)
})

it('allows local writes', () => {
	upstream.value = 9
	result.value = 10
	expect(result.value).toBe(10)
})

it('allows local writes of a type that is valid for the diode but not the upstream', () => {
	result.value = null
	expect(result.value).toBeNull()
})

it('retains the most recent value', () => {
	upstream.value = 9
	result.value = 10
	upstream.value = 11
	expect(result.value).toBe(11)
})

it('does not propagate upstream', () => {
	result.value = 10
	expect(upstream.value).toBe(8)
})
