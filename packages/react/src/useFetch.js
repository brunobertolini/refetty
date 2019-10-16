import { useMemo, useState, useEffect } from 'react'
import { asyncControl } from '@refetty/fetch'

import { useStateRx } from './useStateRx'

export const useFetch = (...args) => {
	const [request, actions] = useMemo(() => asyncControl(...args), [])
	const [state] = useStateRx(request)

	useEffect(() => actions.cancel, [])

	return [state && state.result && state.result.data, state, actions]
}
