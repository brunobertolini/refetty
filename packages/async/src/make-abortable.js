import { observable } from '@refetty/observable'

export const makeAbortable = (
	promise,
	AbortController,
	defaulMessage = 'Aborted'
) => {
	const subject = observable(false)

	const getAbortController = () => {
		if (!AbortController) {
			return
		}

		const controller = new AbortController()
		subject.next(controller)
		return controller.signal
	}

	const abort = (message) =>
		subject.value && subject.value.abort(message || defaulMessage)

	const dispatch = (...params) => {
		const run = promise(...params)
		return typeof run === 'function' ? run(getAbortController()) : run
	}

	return [dispatch, abort]
}
