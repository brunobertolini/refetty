import { useMemo } from 'react'
import { asyncState } from '@refetty/fetch'
import { useStateRx } from './useStateRx'

export const useAsync = (promise, lazy) => {
	const [subject, run] = useMemo(() => asyncState(promise, lazy), [promise])
	const [state] = useStateRx(subject)
	return [state, run]
}
