import * as React from 'react'
import { useContext, useMemo, useCallback, createContext } from 'react'
import { useAsync } from './useAsync'

const Context = createContext({})

export function Provider({ client: fetch, state, children }) {
	const client = useCallback(fetch(state), [state])
	const value = useMemo(() => ({ client, state }), [client, state])
	return <Context.Provider value={value}>{children}</Context.Provider>
}

export function useFetch(...args) {
	const { client } = useContext(Context)
	const fetch = useCallback(client, [])
	return useAsync(fetch, ...args)
}

export function useClient() {
	const { client } = useContext(Context)
	return client
}
