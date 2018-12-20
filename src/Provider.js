import * as React from 'react'
import { useState, useContext, createContext } from 'react'
import { useAsync } from './useAsync'

const Context = createContext({})

export function Provider({ children, client: fetch }) {
	const [token, setToken] = useState(false)
	const client = req => fetch(req, token)

	return (
		<Context.Provider value={{ client, token, setToken }}>
			{children}
		</Context.Provider>
	)
}

export function useToken() {
	const { token, setToken } = useContext(Context)
	return { token, setToken }
}

export function useClient() {
	const { client } = useContext(Context)
	return client
}

export function useFetch(req) {
	return useClient()(req)
}

export function useFetchHook(req) {
	return useAsync(useFetch(req))
}
