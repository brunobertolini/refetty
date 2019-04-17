import { BehaviorSubject } from 'rxjs'

export const makeCancelable = ({
	handler,
	getCancel,
	message = 'Canceled',
}) => {
	const { value, next } = new BehaviorSubject(false)

	const getCancelToken = () => {
		const source = getCancel()
		next(source)
		return source.token
	}

	const cancel = () => value && value.cancel(message)

	const run = (...params) =>
		handler.apply(fetch, [
			...((params.length && params) || [{}]),
			{ cancelToken: getCancelToken() },
		])

	return [run, cancel]
}
