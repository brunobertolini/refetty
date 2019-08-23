# Fetch

## Basic usage

Install: `yarn add @refetty/fetch`

Create a `fetch.js`:

```
import { stateProvider } from '@refetty/fetch'
import axios from 'axios'

const request = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

const handler = options => state =>
  request({
    ...options,
		headers: {
			...options.headers,
    	...(state.token && { Authorization: `Bearer ${state.token}` }
    }
  })

const initialState = {}

export const fetch = stateProvider(hanlder, initialState)
```

And to change instance state:

```
fetch.setState(prev => ({ ...prev, token: '123' }))
```

## Advanced Usage
