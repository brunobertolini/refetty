import { BehaviorSubject } from 'rxjs'

export const createSDK = (handler, { initialState, AbortController } = {}) => {
	const state = new BehaviorSubject(initialState)

	const fetch = (...args) => {
		const res = handler(...args)
		return typeof res === 'function' ? res(state.value) : res
	}

	const sdk = {
		fetch,
		state: state.value,
	}

	sdk.add = (...args) => {
		const fn = args[1] || args[0]
		const name = args[1] && args[0]

		const handler = (...args) => fetch(fn(...args))
		handler.AbortController = AbortController

		if (name) {
			sdk[name] = handler
		}

		return handler
	}

	sdk.setState = value =>
		state.next(typeof value === 'function' ? value(state.value) : value)

	state.subscribe(value => {
		sdk.state = value
	})

	return sdk
}
