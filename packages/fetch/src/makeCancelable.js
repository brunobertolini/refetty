import { BehaviorSubject } from 'rxjs'

export const makeCancelable = ({
	handler,
	getCancel,
	message = 'Canceled',
}) => {
	const subject = new BehaviorSubject(false)

	const getCancelToken = () => {
		const source = getCancel()
		subject.next(source)
		return source.token
	}

	const cancel = () => subject.value && subject.value.cancel(message)

	const run = (...params) =>
		handler.apply(fetch, [
			...((params.length && params) || [{}]),
			{ cancelToken: getCancelToken() },
		])

	return [run, cancel]
}
