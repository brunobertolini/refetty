import { createSDK } from '~/create-sdk'

test('should create simple handler', () => {
	const options = { a: 1 }
	const sdk = createSDK((opts) => opts)

	const result = sdk.fetch(options)

	expect(result).toBe(options)
})

test('should create simple with state', () => {
	const options = { a: 1 }
	const sdk = createSDK((opts) => (state) => [opts, state], {
		initialState: {},
	})

	const result = sdk.fetch(options)

	expect(result).toEqual([options, {}])
})

test('should add handled sdk fetch', () => {
	const options = { a: 1 }

	const sdk = createSDK(
		(opts) => (state) => (signal) => [opts, state, signal],
		{
			initialState: {},
		}
	)

	sdk.add('getUsers', (params) => params)

	const result = sdk.getUsers(options)(123456)
	expect(result).toEqual([options, {}, 123456])
})

test('should add handled sdk fetch with state', () => {
	const options = { a: 1 }
	const initialState = {
		state: 10,
	}

	const sdk = createSDK(
		(opts) => (state) => (signal) => [opts, state, signal],
		{
			initialState,
		}
	)

	sdk.add('getUsers', (params) => (state) => [params, state])

	const result = sdk.getUsers(options)(123456)
	expect(result).toEqual([[options, initialState], initialState, 123456])
})

test('should return handled sdk fetch with state', () => {
	const options = { a: 1 }
	const initialState = {
		state: 10,
	}

	const sdk = createSDK(
		(opts) => (state) => (signal) => [opts, state, signal],
		{
			initialState,
		}
	)

	const getUsers = sdk.add('getUsers', (params) => (state) => [params, state])

	const result = getUsers(options)(123456)
	expect(result).toEqual([[options, initialState], initialState, 123456])
})

test('should return handled sdk fetch with state and one param', () => {
	const options = { a: 1 }
	const initialState = {
		state: 10,
	}

	const sdk = createSDK(
		(opts) => (state) => (signal) => [opts, state, signal],
		{
			initialState,
		}
	)

	const getUsers = sdk.add((params) => (state) => [params, state])

	const result = getUsers(options)(123456)
	expect(result).toEqual([[options, initialState], initialState, 123456])
})

test('should resolve handler', async () => {
	const options = { a: 1 }
	const initialState = {
		state: 10,
	}

	const sdk = createSDK(
		(opts) => (state) => (signal) => Promise.resolve([opts, state, signal]),
		{
			initialState,
		}
	)

	const getUsers = sdk.add((params) => (state) => [params, state])

	await expect(getUsers(options)(123456)).resolves.toEqual([
		[options, initialState],
		initialState,
		123456,
	])
})

test('should reject handler', async () => {
	const options = { a: 1 }
	const initialState = {
		state: 10,
	}

	const sdk = createSDK(
		(opts) => (state) => (signal) => Promise.reject([opts, state, signal]),
		{
			initialState,
		}
	)

	const getUsers = sdk.add((params) => (state) => [params, state])

	await expect(getUsers(options)(123456)).rejects.toEqual([
		[options, initialState],
		initialState,
		123456,
	])
})
