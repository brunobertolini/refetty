import { useMemo, useEffect } from 'react'
import { control } from '@refetty/async'

import { useStateRx } from './useStateRx'

export const usePromise = (...args) => {
	const [rxState, dispatch, ...meta] = useMemo(() => control(...args), [])
	const [state] = useStateRx(rxState)

	useEffect(() => dispatch && dispatch.abort, [])

	return [state && state.result, state, dispatch, ...meta]
}
