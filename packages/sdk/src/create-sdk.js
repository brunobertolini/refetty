import { BehaviorSubject } from 'rxjs'

export const createSDK = (handler, { initialState, AbortController } = {}) => {
	const state = new BehaviorSubject(initialState)

	const cancelable = (...args) => signal => {
		const res = handler(...args)
		return typeof res === 'function' ? res(state.value, signal) : res
	}

	const fetch = (...args) => cancelable(...args)()

	const sdk = {
		fetch,
		state: state.value,
	}

	sdk.add = (...args) => {
		const fn = args[1] || args[0]
		const name = args[1] && args[0]

		const handler = (...args) => cancelable(fn(...args))

		if (name) {
			sdk[name] = handler
			sdk[name].AbortController = AbortController
		}

		const endpoint = (...args) => handler(...args)()
		endpoint.AbortController = AbortController

		return endpoint
	}

	sdk.setState = value =>
		state.next(typeof value === 'function' ? value(state.value) : value)

	state.subscribe(value => {
		sdk.state = value
	})

	return sdk
}
