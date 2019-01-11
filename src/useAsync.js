import { useState, useEffect } from 'react'

export const useAsync = (promise, autorun = false) => (...args) => {
	const [state, setState] = useState({
		loading: autorun,
		response: {},
		error: false,
	})

	async function run(...params) {
		;(!state.loading || state.error) &&
			setState({ loading: true, error: false })

		try {
			const response = await promise(...params)
			setState({ loading: false, response })
		} catch (error) {
			setState({ loading: false, error })
		}
	}

	const refresh = () => run(...args)

	autorun &&
		useEffect(() => {
			run(...args)
		}, [])

	return { ...state, refresh, run }
}
