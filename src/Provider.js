import * as React from 'react'
import { useContext, useMemo, useCallback, createContext } from 'react'
import { useAsync } from './useAsync'

const Context = createContext({})

export function Provider({ client: fetch, state, children }) {
	const client = useCallback(fetch(state), [state])
	const value = useMemo(() => ({ client, state }), [client, state])
	return <Context.Provider value={value}>{children}</Context.Provider>
}

export const useFetch = params => {
	const { client } = useContext(Context)
	const fetch = useCallback(() => client(params), [params])
	return useAsync(fetch)
}

export const useClient = () => {
	const { client } = useContext(Context)
	return client
}
