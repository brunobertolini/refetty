import { BehaviorSubject } from 'rxjs'

export const stateProvider = (handler, initialState) => {
	const state = new BehaviorSubject(initialState)

	const client = (...args) => {
		const res = handler(...args)
		return typeof res === 'function' ? res(state.value) : res
	}

	client.state = state.value
	client.setState = value =>
		state.next(typeof value === 'function' ? value(state.value) : value)

	state.subscribe(value => {
		client.state = value
	})

	return client
}
