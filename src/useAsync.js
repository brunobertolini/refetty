import { useState, useEffect } from 'react'

export const useAsync = promise => (...args) => {
	const [state, setState] = useState({
		loading: !!args.length,
		error: false,
	})

	async function run(...params) {
		;(!state.loading || state.error) &&
			setState({ loading: true, error: false })

		try {
			const result = await promise(...params)
			setState({ loading: false, result })
		} catch (error) {
			setState({ loading: false, error })
		}
	}

	args.length &&
		useEffect(() => {
			run(...args)
			return () => {}
		}, [])

	return [state, run]
}
