<h1 align="center">
  <img src="/logo.png" alt="Refetty" />
</h1>

[![Build Status](https://travis-ci.org/brunobertolini/refetty.svg?branch=develop)](https://travis-ci.org/brunobertolini/refetty)

> **Refetty is a set of tools to help on REST API consume challenge**, like promise cancelable handler, sdk creation ands promise state manager


## Highlights

- :tada: Generic promise state handlers
- :electric_plug: Framework agnostic
- :crystal_ball: AbortController friendly
- :trophy: State management on sdk, (**stop passing access token to all requests manually** :pray:)
- :fire: Some more awesome utilities

## Packages

This repository is a monorepo that we manage using  [Lerna](https://github.com/lerna/lerna). That means that we actually publish  [several packages](https://github.com/brunobertolini/refetty/blob/master/packages)  to npm from the same codebase, including:

| Package                  | Version                                                                   | Description                                                                         |
| ------------------------ | ------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| [sdk](/packages/sdk)     | ![npm](https://img.shields.io/npm/v/@refetty/sdk.svg?style=flat-square)   | State handler with AbortController support                                          |
| [async](/packages/async) | ![npm](https://img.shields.io/npm/v/@refetty/async.svg?style=flat-square) | Promises handle methods                                                             |
| [react](/packages/react) | ![npm](https://img.shields.io/npm/v/@refetty/react.svg?style=flat-square) | Hooks to work with promises (using [async](/packages/async) package under the hood) |


## Basic Usage

Install

```
  yarn add @refetty/sdk @refetty/axios @refetty/react
```


Create an `api.js` file to create your basic sdk

```js
import { createSDK } from '@refetty/sdk'
import { AxiosAbortController } from '@refetty/axios'
import { axios } from 'axios'

const request = axios.create({
  baseURL: 'http://api.example.com',
  headers: {
    'Content-Type': 'application/json',
  },
})

const handler = options => state => request({
  ...options,
  headers: {
    ...options.headers,
    ...(state.token && { Authorization: `Bearer ${state.token}` }),
  }
})

const sdk = createSDK(handler, {
  initialState: {},
  AbortController: AxiosAbortController
})

export const login = sdk.add(auth => ({
  method: 'get',
  url: '/login',
  auth,
  transformResponse: axios.defaults.transformResponse.concat(data => {
    sdk.setState(prevState => ({ ...prevState, token: data.token }))
    return data
  })
}))

export const getUsers = sdk.add(params => ({
  method: 'get',
  url: '/users',
  params
}))
```

Now, in your react components:

```js
import { useFetch } from '@refetty/react'
import { login, getUsers } from './api.js'

const Login = () => {
  const onSubmit = async formValues => {
    try {
      const { data } = await login(formValues)
      // do anything on success
    } catch (error) {
      //...
    }
  }

  return (
    <Form onSubmit={onSubmit}>
      ...
    </Form>
  )
}

const List = () => {
  const [data, { loading }, fetch] = useFetch(getUsers)
 // if you don't want fetch data in onMount, use useFetch(getUsers, { lazy: true }),
 // and do trigger "fetch" function to dispatch request when you want

  return loading ? <Loading /> : data.map(user => <UserCard {...user} />)
}
```

For more detailed explanations and examples, see the packages docs.

## Contribute

You can help improving this project sending PRs and helping with issues.