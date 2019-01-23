import { BehaviorSubject } from 'rxjs'

export const refetty = fetch => {
	const state = new BehaviorSubject()
	const instance = new BehaviorSubject(fetch(state.value))

	const client = (...params) => instance.value(...params)

	client.setState = v => state.next(v)
	client.state = state.value

	state.subscribe(data => {
		client.state = data
		instance.next(fetch(data))
	})

	return client
}

export default refetty
