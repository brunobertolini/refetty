import { BehaviorSubject } from 'rxjs'

export const makeCancelable = (promise, message = 'Canceled') => {
	const subject = new BehaviorSubject(false)

	const getCancelToken = () => {
		if (!promise.getCancel) {
			return ''
		}

		const source = promise.getCancel()
		subject.next(source)
		return source.token
	}

	const cancel = () => subject.value && subject.value.cancel(message)

	const dispatch = (...params) => {
		const run = promise(...params)
		return typeof run === 'function' ? run(getCancelToken()) : run
	}

	return [dispatch, cancel]
}
