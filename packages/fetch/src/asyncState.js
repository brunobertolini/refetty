import { BehaviorSubject } from 'rxjs'

export const asyncState = (promise, lazy = false) => {
	const subject = new BehaviorSubject({
		status: lazy ? 'idle' : 'pending',
		loading: !lazy,
	})

	const dispatch = async (...args) => {
		if (!subject.value.loading || subject.value.error) {
			subject.next({ status: 'pending', loading: true, error: false })
		}

		try {
			const res = await promise(...args)

			subject.next({ status: 'fullfiled', loading: false, error: false, res })
		} catch (error) {
			const status =
				promise.isCancel && promise.isCancel(error) ? 'canceled' : 'rejected'
			subject.next({ status, loading: false, error })
		}
	}

	!lazy && dispatch()

	return [subject, dispatch]
}
