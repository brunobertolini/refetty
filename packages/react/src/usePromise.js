import { useMemo, useEffect } from 'react'
import { control } from '@refetty/async'

import { useStateRx } from './useStateRx'

export const usePromise = (...args) => {
	const [rxState, dispatch, ...meta] = useMemo(() => control(...args), args)
	const [state] = useStateRx(rxState)

	useEffect(() => dispatch?.abort, [])

	return [state?.result, state, dispatch, ...meta]
}
