import { makeCancelable } from './makeCancelable'
import { asyncState } from './asyncState'

export const fetcher = ({ initial, source, getCancelToken }) => {
	const [exec, cancel] = makeCancelable({
		handler: source,
		getCancel: getCancelToken,
	})

	const [state, fetch] = asyncState(exec, initial)

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
