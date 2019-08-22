import { makeCancelable } from './makeCancelable'
import { asyncState } from './asyncState'

const defaultOpts = {
	lazy: false,
	cancelMessage: 'Canceled',
}

export const asyncControl = (promise, opts = defaultOpts) => {
	const [exec, cancel] = makeCancelable(promise, opts.cancelMessage)
	const [state, fetch] = asyncState(exec, opts.lazy)

	const dispatch = (...params) => {
		cancel()
		fetch(...params)
	}

	const setData = value =>
		state.next({
			...state.value,
			res: typeof value === 'function' ? value(state.value.res) : value,
		})

	return [state, { dispatch, cancel, setData }]
}
