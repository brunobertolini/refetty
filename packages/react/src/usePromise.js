import { useMemo, useEffect, useCallback } from 'react'
import { control } from '@refetty/async'

import { useStateRx } from './useStateRx'

export const usePromise = (callback, opts) => {
	const promise = useCallback(callback, [])

	const [observable, dispatch, ...meta] = useMemo(
		() => control(promise, opts),
		[promise, JSON.stringify(opts)]
	)

	const [state] = useStateRx(observable)

	useEffect(() => {
		return dispatch && dispatch.abort
	}, [])

	return [state && state.result, state, dispatch, ...meta]
}
