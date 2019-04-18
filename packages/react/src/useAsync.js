import { useMemo } from 'react'
import { asyncState } from '@refetty/fetch'
import { useStateRx } from './useStateRx'

export const useAsync = (promise, initial) => {
	const [subject, run] = useMemo(() => asyncState(promise, initial), [promise])
	const [state] = useStateRx(subject)
	return [state, run]
}
