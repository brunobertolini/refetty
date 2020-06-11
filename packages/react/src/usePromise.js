import { useMemo, useEffect } from 'react'
import { control } from '@refetty/async'

import { useStateRx } from './useStateRx'

export const usePromise = (promise, { lazy, ...opts } = {}) => {
	const [observable, dispatch, ...meta] = useMemo(
		() => control(promise, { ...opts, lazy: true }),
		[promise, opts]
	)

	const [state] = useStateRx(observable)

	useEffect(() => {
		!lazy && dispatch()
		return dispatch && dispatch.abort
	}, [])

	return [state && state.result, state, dispatch, ...meta]
}
