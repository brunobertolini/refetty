# Refetty - React

React Hooks to make data fetch easy

## Usage

Install `yarn add @refetty/react`

### usePromise

Use `control` from [@refetty/async](./../async) under the hood and bypass all args to them.
It's will make an `abort` call on component unmout too.

```js
import { usePromise } from '@refetty/react'

const List = () => {
  const [result, { loading }, fetch] = usePromise(getUsers)

  if (loading) {
    return <Loading />
  }

  return result && result.data && result.data.length
    ? result.data.map(user => <UserCard {...user} />)
    : <EmptyList />
}
```

### useFetch

Use `usePromise`, but change the first returned array item to return only the request data (`request.data`).


```diff
- import { usePromise } from '@refetty/react'
+ import { useFetch } from '@refetty/react'

const List = () => {
-  const [result, { loading }, fetch] = usePromise(getUsers)
+  const [data, { loading }, fetch] = useFetch(getUsers)

  if (loading) {
    return <Loading />
  }

-  return result && result.data && result.data.length
+  return data && data.length
-    ? result.data.map(user => <UserCard {...user} />)
+    ? data.map(user => <UserCard {...user} />)
    : <EmptyList />
}
```

If you need the statusCode or anytihng else from promise response, you can access it from named `result` prop in state item

```js
  const [data, { result }, fetch] = useFetch(getUsers)
```

Both hooks `usePromise` and `useFetch` will call your promise on component mount. So, if you don't want this behavior and need call promise only when you need (maybe useful when showing data depends on users interaction), you can use `lazy` option:


```js
  const [data, { loading, status }, fetch] = useFetch(getUsers, { lazy: true })
```

In this case, loading start as `false` and status `ìdle`