import * as React from 'react'
import { useContext, useMemo, useCallback, createContext } from 'react'
import { compose } from 'ramda'

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

export const useFetch = (...initial) => useAsync(useClient(), { initial })

export const useRefetty = (mutation, ...initial) => (...params) =>
	useAsync(
		compose(
			useClient(),
			mutation
		),
		params.length ? params : initial.length ? initial : false
	)
