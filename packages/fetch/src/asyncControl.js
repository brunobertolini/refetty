import { makeAbortable } from './makeAbortable'
import { asyncState } from './asyncState'

const defaultOpts = {
	lazy: false,
	abortMessage: 'Aborted',
}

export const asyncControl = (promise, opts = defaultOpts) => {
	const [exec, abort] = makeAbortable(
		promise,
		opts.AbortController || promise.AbortController,
		opts.abortMessage
	)

	const [state, run] = asyncState(exec, opts.lazy)

	const dispatch = (...params) => {
		abort()
		run(...params)
	}

	const setData = value =>
		state.next({
			...state.value,
			result: typeof value === 'function' ? value(state.value.result) : value,
		})

	return [state, { dispatch, abort, setData }]
}
