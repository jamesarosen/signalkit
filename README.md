# Signalkit

Signalkit is a toolkit for working with Signals. It includes (or may include
in the future) utility functions, compound signals, and higher-order signals.

## Implementations

There are several popular implementations of Signals, including

* [@preact/signals](https://github.com/preactjs/signals)
* [Qwik](https://qwik.builder.io/)
* [signia](https://github.com/tldraw/signia)
* [Starbeam](https://www.starbeamjs.com/)

These all share certain features and concepts, but they don't expose the same
APIs. Therefore, there are (or may be in the future) implementations of
signalkit for each.

Currently, signalkit supports `@preact/signals` through
[signalkit-preact](./packages/signalkit-preact/).

## Compound Signals

### Diode

A diode follows an upstream signal but allows local modifications. The most
recent write wins. Local writes do not propagate upstream.

One use-case is marking an update as "consumed" so it is only acted upon once.
In the following example, changes to `upstream` get logged at the current log
level, but if `logLevel` changes, they don't get re-logged at the new level.

```ts
import { diode } from 'signalkit-preact'

const upstream: ReadonlySignal<string> = anUpstreamSignal()

type LogLevel = keyof typeof console
const logLevel = Signal<LogLevel>('debug')
const myCopy = diode<string | null>(upstream)

effect(() => {
	if (myCopy.value) {
		console[logLevel.value](myCopy.value)
		myCopy.value = null
	}
})
```
