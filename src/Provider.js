import * as React from 'react'
import { useContext, useMemo, useCallback, createContext } from 'react'

import { useAsync } from './useAsync'

const Context = createContext({})

export function Provider({ client: fetch, children, ...props }) {
	const client = useCallback(fetch(props), [props])
	const value = useMemo(() => ({ client, ...props }), [client, props])
	return <Context.Provider value={value}>{children}</Context.Provider>
}

export const useClient = () => {
	const { client } = useContext(Context)
	return client
}

export const useFetch = (mutation, initial) => () =>
	useAsync(useClient(), {
		mutation: params => [mutation(params)],
		initial: initial ? [initial] : false,
	})
