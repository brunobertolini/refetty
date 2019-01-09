import { useState, useEffect } from 'react'

export function useAsync(promise, ...args) {
	const [state, setState] = useState({
		loading: true,
		response: {},
		error: false,
	})

	async function run() {
		;(!state.loading || state.error) &&
			setState({ loading: true, error: false })

		try {
			const response = await promise(...args)
			setState({ loading: false, response })
		} catch (error) {
			setState({ loading: false, error })
		}
	}

	const refresh = () => run(...args)

	useEffect(() => {
		run(...args)
	}, [])

	return { ...state, refresh, run }
}
