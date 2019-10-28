import { BehaviorSubject } from 'rxjs'

export const execState = (promise, lazy = false) => {
	const subject = new BehaviorSubject({
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
				status: 'fullfiled',
				loading: false,
				error: false,
				result,
			})

			return result
		} catch (error) {
			const status =
				promise.isAborted && promise.isAborted(error) ? 'aborted' : 'rejected'
			subject.next({ status, loading: false, error })

			throw error
		}
	}

	!lazy && dispatch()

	return [subject, dispatch]
}