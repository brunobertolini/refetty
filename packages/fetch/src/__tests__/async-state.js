import { asyncState } from '~/asyncState'

test('async state inital run', () => {
	const isLazy = false
	const [subject] = asyncState(() => {}, isLazy)

	expect(subject.value).toEqual({
		loading: true,
		status: 'pending',
	})
})

test('create as lazy', () => {
	const isLazy = true
	const [subject] = asyncState(() => {}, isLazy)

	expect(subject.value).toEqual({
		loading: false,
		status: 'idle',
	})
})

test('lazy run', async () => {
	const promise = params => new Promise(resolve => resolve(params))

	const isLazy = true
	const [subject, dispatch] = asyncState(promise, isLazy)

	expect(subject.value).toEqual({
		loading: false,
		status: 'idle',
	})

	dispatch({ test: true })

	expect(subject.value).toEqual({
		error: false,
		loading: true,
		status: 'pending',
	})
})

test('correct passed args to promise', async () => {
	const promise = params => new Promise(resolve => resolve(params))

	const isLazy = true
	const [subject, dispatch] = asyncState(promise, isLazy)
	const result = await dispatch('success')

	expect(subject.value).toEqual({
		error: false,
		loading: false,
		status: 'fullfiled',
		result,
	})
})

test('error handler', async () => {
	const promise = params => new Promise((resolve, reject) => reject(params))

	const isLazy = true
	const [subject, dispatch] = asyncState(promise, isLazy)

	try {
		await dispatch('error')
	} catch (error) {
		expect(subject.value).toEqual({
			error,
			loading: false,
			status: 'rejected',
		})
	}
})

test('abort dispatch', async () => {
	const promise = params => new Promise((resolve, reject) => reject(params))
	promise.isCancel = () => true

	const isLazy = true
	const [subject, dispatch] = asyncState(promise, isLazy)

	try {
		await dispatch('error')
	} catch (error) {
		expect(subject.value).toEqual({
			error,
			loading: false,
			status: 'canceled',
		})
	}
})
