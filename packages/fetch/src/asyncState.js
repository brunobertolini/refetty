import { BehaviorSubject } from 'rxjs'

export const asyncState = (promise, initial) => {
	const subject = new BehaviorSubject({
		status: initial ? 'loading' : 'idle',
		loading: initial ? true : false,
	})

	async function run(...args) {
		;(!subject.value.status !== 'loading' || subject.value.erorr) &&
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

	initial && run(...initial)

	return [subject, run]
}
