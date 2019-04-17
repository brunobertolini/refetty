import { useMemo } from 'react'
import { asyncState } from '@refetty/fetch'
import { useStateRx } from './useStateRx'

export const useAsync = promise => {
	const [, { run, subject }] = useMemo(() => asyncState(promise), [promise])
	const [state] = useStateRx(subject)
	return [state, run]
}
