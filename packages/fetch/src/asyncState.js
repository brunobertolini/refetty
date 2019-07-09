import { BehaviorSubject } from 'rxjs'

export const asyncState = (promise, lazy = false) => {
	const subject = new BehaviorSubject({
		status: lazy ? 'idle' : 'loading',
		loading: !lazy,
	})

	async function run(...args) {
		;(subject.value.status !== 'loading' || subject.value.error) &&
			subject.next({
				status: 'loading',
				loading: true,
				error: false,
			})

		try {
			const result = await promise(...args)
			subject.next({
				status: 'fullfiled',
				loading: false,
				error: false,
				result,
			})
		} catch (error) {
			subject.next({ status: 'rejected', loading: false, error })
		}
	}

	!lazy && run()

	return [subject, run]
}
