# Refetty - Async

Refetty promise tools to manages promise state and handle promise aborts

## Usage

To install run `yarn add @refetty/async`

### Promise state manager

The `execState` is a simple handler, you will pass a promise to them was first params, and a boolean was second, if true, it will not execute promise initially, and wait for a manual call.


You will receive a array return with state (arr[0]) and a dispatch function (arr[1]) to re-execute promise when you want.
State is a obersvable, so you can call subsbribe and unsubscribe methods.


```js
import { execState } from '@refetty/async'

const lazy = true // default false

// to create state
const [state, run] = execState(promise, lazy)

// to listen state chages
const listner = state.subscribe(value => console.log('State changes:' value))

// to unsubscribe listner
state.unsubscribe(listner)
```

State value is an object with follow props:

- status (_string_) - indicates the executes status, and can be one fo these: `idle` | `pending` | `fulfilled` | `rejected` | `aborted`
- loading (_boolean_) - shorthand to check if a promise is in `pending` status
- result - a resolved promise response with `fulfilled` status (cleared only on next execution error or success)
- error - a rejected promise response with `rejected` or `aborted` status (cleared in all re-executions)

> Note: aborted status depends on the promise to have an `isAborted` method that checks error (`promise.isAborted`)

### Promise abort handler

In `makeAbortable`, we require two args: a function and an instanciable abort controller [spec compilant](https://dom.spec.whatwg.org/#dom-abortcontroller-abortcontroller).

This return an array with two items, the first is a handled dispatcher, every call will create a new instance of abort controller. And the aborter function as second. Let's me show the code:

```js
const handler = params => signal => fetch({
	...params,
	signal
})

const [dispath, abort] = makeCancelable(handler, AbortController)

dispath({
	method: 'get',
	url: '/users
})

abort()
```

> Note: the `abort()` function will not called automatically on call dispatch again.


### Putting all together

To make our dev process painless, you have the option to use all-in-one method. The `control` method uses `execState` and `makeCancelable` under the hood. It's expect	only one required param: promise. Abort Controller need be a prop on promise, like this:

```js
import { control } from '@refetty/async'

const promise = params => signal => fetch(...)
promise.AbortContoller = AbortController

const [state, dispatch] = control(promise)
```

Unlike from `makeCancelable`, every `dispatch` call will call `abort` function automatically before.
And if you need use `abort` by yourself, you can acess them on `dispatch.abort()`

It's has a second param too, option object when you can pass `lazy` and 'abortMessage`

```js
const [state, dispatch] = control(promise, { lazy: true, abortMessage: 'This request was aborted!' })
```