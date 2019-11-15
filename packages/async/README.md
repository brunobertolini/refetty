# Refetty - Async

Refetty promise tools to manages promise state and handle promise cancels

## Usage

To install run `yarn add @refetty/async`

## Promise state manager

The `execState` is a simple handler, you will pass a promise to them was first params, and a boolean was second, if true, it will not execute promise initially, and wait for a manual call.


You will receive a array return with state (arr[0]) and a dispatch function (arr[1]) to re-execute promise when you want.
State is a obersvable, so you can call subsbribe and unsubscribe methods.


```js
import { execState } from '@refetty/async'
const [state, run] = execState(promise)

// to listen state chages
const listner = state.subscribe(value => console.log('State changes:' value))

state.unsubscribe(listner)
```

State value is an object with follow props:

- status (_string_) - indicates the executes status, and can be one fo these: `idle` | `pending` | `fulfilled` | `rejected` | `aborted`
- loading (_boolean_) - shorthand to check if a promise is in `pending` status
- result - a resolved promise response with `fulfilled` status (cleared only on next execution error or success)
- error - a rejected promise response with `rejected` or `aborted` status (cleared in all re-executions)

> Note: aborted status depends on the promise to have an `isAborted` method that checks error (`promise.isAborted`)

