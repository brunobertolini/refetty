import { useState, useEffect } from 'react'

export const useAsync = (promise, { mutation, initial } = {}) => {
	const [state, setState] = useState({
		loading: initial ? true : false,
		error: false,
	})

	async function run(...args) {
		;(!state.loading || state.error) &&
			setState({ loading: true, error: false })

		try {
			const result = await promise(...(mutation ? mutation(...args) : args))
			setState({ loading: false, result })
		} catch (error) {
			setState({ loading: false, error })
		}
	}

	initial &&
		useEffect(() => {
			run(...initial)
			return () => {}
		}, [])

	return [state, run]
}
