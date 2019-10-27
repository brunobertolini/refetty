import { createSDK } from '~/create-sdk'

test('create simple handler', () => {
	const options = { a: 1 }
	const sdk = createSDK(opts => opts)

	const result = sdk.fetch(options)

	expect(result).toBe(options)
})

test('create simple with state', () => {
	const options = { a: 1 }
	const sdk = createSDK(opts => state => [opts, state], { initialState: {} })

	const result = sdk.fetch(options)

	expect(result).toEqual([options, {}])
})

test('add handled sdk fetch', () => {
	const options = { a: 1 }

	const sdk = createSDK(opts => (state, signal) => [opts, state, signal], {
		initialState: {},
	})

	sdk.add('getUsers', params => params)

	const result = sdk.getUsers(options)(123456)
	expect(result).toEqual([options, {}, 123456])
})
