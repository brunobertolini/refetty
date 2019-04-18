import { useMemo } from 'react'
import { fetcher } from '@refetty/fetch'

import { useStateRx } from './useStateRx'

export const useFetcher = (...params) => {
	const [request, actions] = useMemo(() => fetcher(...params), [])
	const [state] = useStateRx(request)
	return [state, actions]
}
