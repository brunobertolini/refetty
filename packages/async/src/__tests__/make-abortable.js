import { BehaviorSubject } from 'rxjs'
import { makeAbortable } from '~/make-abortable'

jest.mock('rxjs')

test('unwrapped promise', () => {
	const handler = params => new Promise(resolve => resolve(params))

	const [dispatch] = makeAbortable(handler)
	const resolve = dispatch('params')

	expect(resolve).resolves.toBe('params')
})

test('create new abort controller instance', () => {
	let state = {}

	function MockBehaviorSubject(initalValue) {
		this.value = initalValue

		this.next = value => {
			this.value = value
			state.value = value
		}
	}

	BehaviorSubject.mockImplementation(MockBehaviorSubject)

	function AbortController() {
		this.signal = 'signal'
		this.abort = () => {}
	}

	const handler = () => () => new Promise(() => {})
	const [dispatch] = makeAbortable(handler, AbortController)

	dispatch('params')
	expect(state.value).toBeInstanceOf(AbortController)
})

test('pass signal to promise', () => {
	const promise = params => signal => [params, signal]

	function AbortController() {
		this.signal = 'signal'
		this.abort = () => 'aborted'
	}

	const [dispatch] = makeAbortable(promise, AbortController)

	expect(dispatch('params')).toEqual(['params', 'signal'])
})

test('abort promise', async () => {
	const handler = () => () => new Promise(resolve => {})

	function AbortController() {
		this.signal = 'signal'
		this.abort = message => message
	}

	const [dispatch, abort] = makeAbortable(handler, AbortController)

	dispatch()
	expect(abort('aborted')).toBe('aborted')
})
