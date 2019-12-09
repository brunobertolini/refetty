import { observable } from '@refetty/observable'

export const execState = (promise, lazy = false) => {
	const subject = observable({
		status: lazy ? 'idle' : 'pending',
		loading: !lazy,
	})

	const dispatch = async (...args) => {
		if (!subject.value.loading || subject.value.error) {
			subject.next({ status: 'pending', loading: true, error: false })
		}

		try {
			const result = await promise(...args)

			subject.next({
				status: 'fulfilled',
				loading: false,
				error: false,
				result,
			})

			return result
		} catch (error) {
			const status =
				promise.isAborted && promise.isAborted(error) ? 'aborted' : 'rejected'
			subject.next({ status, loading: false, error })
		}
	}

	!lazy && dispatch()

	return [subject, dispatch]
}
