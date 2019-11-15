
# Refetty - SDK

...

## Usage

```js
const request = axios.create({
  baseURL: 'http://api.example.com'
})

export const sdk = createSDK(request)
```

The `createSDK` expect a function as param. That function can be a simple request function, like axios or axios instance, but at this point, you not have many aditional benefits.

To get more power of `createSDK` you can pass as param, a function that return another function, and the second function will receive sdk state, like so:

```js
export const sdk = createSDK(opts => state => axios({
  ...opts,
  header: {
    Authorization: `Bearer ${state.token}`
  }
}))
```

### Creating endpoints handlers

To create endpoint handlers, you can use `sdk.add`:

```js
const sdk = createSDK(handler)

export const getUsers = sdk.add(params => ({
  method:  'get',
  url:  '/users',
  params
}))
```

It's will return a wrapped handler, so when you call `getUsers()`, it's will execute all function stack, until return of handler function, defined on `createSDK`.

If you want get state at this point, to change params or something else, you can do this:

```js
export const getUsers = sdk.add(params => state => ({
  method: 'get',
  url: state.currentCompany ? `/users?companyId=${currentCompany}`,
  params
}))
```

### Options and promise cancelable

if you need support cancelable requests, can chaining a new function in handler that will receive a signal to identify requests:

```js
import { AxiosAbortController } from '@refetty/axios'

const handler = opts => state => cancelToken => axios({
  ...opts,
  cancelToken,
  header: {
    Authorization:  `Bearer ${state.token}`
  }
})

export const sdk = createSDK(handler)
```

Now, every endpoint function handled by `sdk.add` will abortable, returning another function when called:

```js
export const getUsers = sdk.add(params => {... })

// call and cancel request
const source = new axios.CancelToken.source()
getUsers(params)(source.token)
source.cancel()
```

Another power of `createSDK` has on `options` second param. That is an object with these props:

1. initialState - the inital sdk state
2. AbortController - a function or class, following the [Abort Controller spec](https://dom.spec.whatwg.org/#dom-abortcontroller-abortcontroller)

> If you are using axios to fetch data, you may know that it's has a specific way to cancel request that not follow aborto controller spec. So, you can user AxiosAbortController adapter to make this compatible

```js
import { AxiosAbortController } from '@refetty/axios'

const handler = opts => state => axios({
  ...opts,
  header: {
    Authorization: `Bearer ${state.token}`
  }
})

export const sdk = createSDK(handler, { AbortController: AxiosAbortController })
```
At this point, we have a new feature, `sdk.add` will attach `AbortController` on handled functions, so that will be possible create a new cancel token doing `getUsers.AbortController()`, which in this case is equivalent to `new axios.CancelToken.source()` since we are using the axios adapter to abort controller spec.

This attach is useful when your program receive a standalone `getUsers` promise, and not know how manages cancels. All your program needs to know is that it has this method available, which follows the official Abort Controller spec.