# Fetch

## Basic Usage

```
import axios from 'axios';
import { refetty, useAsync } from 'refetty';
import { compose } from 'ramda';

const instance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

const client = token => req =>
  instance({
    ...req,
    ...(token
      ? {
          headers: {
            ...req.headers,
            Authorization: `Bearer ${token}`,
          },
        }
      : {}),
  });

const initialState = {}

export const fetch = refetty(client, initialState)
export const setToken = token => fetch.setState(prev => ({ ...prev, token }))
```
