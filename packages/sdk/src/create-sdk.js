import { observable } from '@refetty/observable'

export const createSDK = (handler, { initialState, AbortController } = {}) => {
	const state = observable(initialState)

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

		function handler(...args) {
			if (!(this instanceof handler)) {
				return new handler(...args)
			}

			const options = fn(...args)
			const data =
				typeof options === 'function' ? options(state.value) : options
			const result = fetch(data)

			return typeof result === 'function' && this.signal
				? result(this.signal)
				: result
		}

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
