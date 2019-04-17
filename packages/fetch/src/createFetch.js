import { BehaviorSubject } from 'rxjs'

export const createFetch = (handler, initialState) => {
	const state = new BehaviorSubject(initialState)
	const client = options => handler(options, state.value)

	client.state = state.value
	client.setState = value =>
		state.next(typeof value === 'function' ? value(state.value) : value)

	state.subscribe(value => {
		client.state = value
	})

	return client
}
