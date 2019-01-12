import * as React from 'react'
import { useContext, useMemo, useCallback, createContext } from 'react'
import { compose } from 'ramda'
import { useAsync } from './useAsync'

const Context = createContext({})

export function Provider({ client: hoc, children, ...props }) {
	const client = useCallback(hoc(props), [props])
	const value = useMemo(() => ({ client, ...props }), [client, props])
	return <Context.Provider value={value}>{children}</Context.Provider>
}

const useClient = () => {
	const { client } = useContext(Context)
	return client
}

export const useFetch = (...args) => useAsync(useClient())(...args)

export const useRefetty = fn => (...args) =>
	useAsync(
		useCallback(
			compose(
				useClient(),
				fn
			),
			[]
		)
	)(...args)
