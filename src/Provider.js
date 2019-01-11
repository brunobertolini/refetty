import * as React from 'react'
import { useContext, useMemo, useCallback, createContext } from 'react'
import { compose } from 'ramda'
import { useAsync } from './useAsync'

const Context = createContext({})

export function Provider({ client: fetch, state, children }) {
	const client = useCallback(fetch(state), [state])
	const value = useMemo(() => ({ client, state }), [client, state])
	return <Context.Provider value={value}>{children}</Context.Provider>
}

export function useClient() {
	const { client } = useContext(Context)
	return client
}

export function useFetch(...args) {
	const { client } = useContext(Context)
	const fetch = useCallback(client, [])
	return useAsync(fetch, args.length)(...args)
}

export const useRefetty = fn => (...args) => {
	const { run, ...rest } = useFetch(args.length ? fn(...args) : undefined)

	return {
		...rest,
		run: compose(
			run,
			fn
		),
	}
}
