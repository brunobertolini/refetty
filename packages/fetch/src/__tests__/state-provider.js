import { stateProvider } from '~/stateProvider'

test('create simple handler', () => {
	const options = { a: 1 }

	const handler = stateProvider(opts => {
		expect(opts).toBe(options)
	})

	handler(options)
})

test('create statefull inital state', () => {
	const options = { b: 10 }
	const initialState = { a: 1 }

	const handler = stateProvider(
		opts => state => {
			expect(opts).toBe(options)
			expect(state).toBe(initialState)
		},
		initialState
	)

	handler(options)
})

test('create statefull handler', () => {
	const options = { b: 10 }
	const data = { a: 1 }

	const handler = stateProvider(opts => state => {
		expect(opts).toBe(options)
		expect(state).toBe(data)
	})

	handler.setState(data)

	handler(options)
})
