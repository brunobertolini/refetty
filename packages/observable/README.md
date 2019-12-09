# Refetty - Observable

Simple and lightweight observable creator

## Usage

To install run `yarn add @refetty/observable`

```js
import { observable } from '@refetty/observable'

const initalValue = 100
const obs = observable(initialValue)

console.log(obs.value)
// logs: 100

// To add listners:
const lisnter = obs.subscribe(value => console.log(value)) // will log new value on each change

// to remove listner
obs.unsubscribe(listner)

// And finally, to change value
obs.next('your new value')

// or if you want get previous value, pass a callback
obs.next(prevValue => prevValue+100)
// and the new value is 200

```