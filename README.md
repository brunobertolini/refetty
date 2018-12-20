# Refetty

## Basic Usage

```
import { Provider, useFetchHook } from 'refetty'
import axios from 'axios'

const fetch = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com'
})

const client = (req, token) => fetch(req)

export const UsersList = () => {
  const { data, loading, refresh } = useFetchHook({
		method: 'get',
		url: '/users
	})

  return loading ? 'Loading...' : (
    <>
      <button onClick={refresh}>Refresh</button>
      {data.map((user, key) => (
        <div>{user.name}</div>
      ))}
    </>
  )
}


export const App = () => (
	<Provider client={client}>
		<UsersList />
	</Provider>
)
```
