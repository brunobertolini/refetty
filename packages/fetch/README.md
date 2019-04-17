# Fetch

## Basic Usage

```
import axios from 'axios';
import { refetty, useAsync } from 'refetty';
import { compose } from 'ramda';

const request = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

const client = (options, state) =>
  request({
    ...options,
		headers: {
			...options.headers,
    	...(state.token && { Authorization: `Bearer ${state.token}` }
    }
  })

const initialState = {}

export const fetch = createFetch(client, initialState)
export const setToken = token => fetch.setState(prev => ({ ...prev, token }))
```
