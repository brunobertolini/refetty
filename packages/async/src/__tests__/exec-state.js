import { execState } from '~/exec-state'

test('async state inital run', () => {
	const isLazy = false
	const [subject] = execState(() => {}, isLazy)

	expect(subject.value).toEqual({
		loading: true,
		status: 'pending',
	})
})

test('create as lazy', () => {
	const isLazy = true
	const [subject] = execState(() => {}, isLazy)

	expect(subject.value).toEqual({
		loading: false,
		status: 'idle',
	})
})

test('lazy run', async () => {
	const promise = params => new Promise(resolve => resolve(params))

	const isLazy = true
	const [subject, dispatch] = execState(promise, isLazy)

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
	const [subject, dispatch] = execState(promise, isLazy)
	const result = await dispatch('success')

	expect(subject.value).toEqual({
		error: false,
		loading: false,
		status: 'fulfilled',
		result,
	})
})

test('error handler', async () => {
	const promise = params => new Promise((resolve, reject) => reject(params))

	const isLazy = true
	const [subject, dispatch] = execState(promise, isLazy)

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
	promise.isAborted = () => true

	const isLazy = true
	const [subject, dispatch] = execState(promise, isLazy)

	try {
		await dispatch('error')
	} catch (error) {
		expect(subject.value).toEqual({
			error,
			loading: false,
			status: 'aborted',
		})
	}
})
