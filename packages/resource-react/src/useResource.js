import { useMemo, useEffect } from 'react'
import { useStateRx } from './useStateRx'

export const useResource = (resource, options) => {
	const res = useMemo(() => resource(options), [])

	const [state] = useStateRx(res.getState())
	const [ctx] = useStateRx(res.getContext())

	useEffect(() => () => res.cancel(), [])

	return [state, ctx, res]
}
