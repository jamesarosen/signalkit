import type { ReadonlySignal, Signal } from '@preact/signals-core'
import { effect, signal } from '@preact/signals-core'

/**
 * Build a mutable Signal that watches an upstream signal. Last write wins.
 * Local writes are not propagated upstream.
 */
export default function diode<S>(upstream: ReadonlySignal<S>): Signal<S> {
	const result = signal(upstream.value)
	effect(() => {
		result.value = upstream.value
	})
	return result
}
