import { BehaviorSubject } from 'rxjs'

export const createFetch = (fetch, initial) => {
	const state = new BehaviorSubject(initial)
	const instance = new BehaviorSubject(fetch(state.value))

	const client = (...params) => instance.value(...params)

	client.setState = v => state.next(v(state.value))
	client.state = state.value

	state.subscribe(data => {
		client.state = data
		instance.next(fetch(data))
	})

	return client
}
