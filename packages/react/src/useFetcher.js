import { useMemo } from 'react'
import { fetcher } from '@refetty/fetch'

import { useStateRx } from './useStateRx'

export const useFetcher = (...args) => {
	const [request, actions] = useMemo(() => fetcher(...args), [])
	const [state] = useStateRx(request)
	return [state, actions]
}
