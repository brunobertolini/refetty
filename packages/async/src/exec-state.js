import { observable } from '@refetty/observable'

const defaultOpts = {
	lazy: false,
	cache: true,
}

export const execState = (promise, opts = defaultOpts) => {
	const subject = observable({
		status: opts.lazy ? 'idle' : 'pending',
		loading: !opts.lazy,
	})

	const dispatch = async (...args) => {
		if (!subject.value.loading || subject.value.error) {
			const next = { status: 'pending', loading: true, error: false }
			subject.next(prev => (opts.cache ? { ...prev, ...next } : next))
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

	!opts.lazy && dispatch()

	return [subject, dispatch]
}
