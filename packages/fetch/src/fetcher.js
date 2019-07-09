import { makeCancelable } from './makeCancelable'
import { asyncState } from './asyncState'

export const fetcher = ({ source, getCancelToken, lazy }) => {
	const [exec, cancel] = makeCancelable({
		promise: source,
		getCancel: getCancelToken,
	})

	const [state, fetch] = asyncState(exec, lazy)

	const run = (...params) => {
		cancel()
		fetch(...params)
	}

	const setData = value =>
		state.next({
			...state.value,
			result: typeof value === 'function' ? value(state.value.result) : value,
		})

	return [state, { run, cancel, setData }]
}
