import { makeAbortable } from './make-abortable'
import { execState } from './exec-state'

const defaultOpts = {
	lazy: false,
	abortMessage: 'Aborted',
}

export const control = (promise, opts = defaultOpts) => {
	const [exec, abort] = makeAbortable(
		promise,
		opts.AbortController || promise.AbortController,
		opts.abortMessage
	)

	const [state, run] = execState(exec, opts)

	const dispatch = (...params) => {
		abort()
		return run(...params)
	}

	dispatch.abort = abort

	const setData = value =>
		state.next({
			...state.value,
			result: typeof value === 'function' ? value(state.value.result) : value,
		})

	return [state, dispatch, { setData }]
}
