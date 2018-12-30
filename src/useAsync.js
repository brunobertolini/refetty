import { useState, useEffect } from 'react'

export function useAsync(promise, ...args) {
	const [error, setError] = useState(false)
	const [loading, setLoading] = useState(true)
	const [response, setResponse] = useState({})

	async function run(...params) {
		!loading && setLoading(true)

		try {
			const response = await promise(...params)
			setResponse(response)
		} catch (err) {
			setError(err)
		} finally {
			setLoading(false)
		}
	}

	const refresh = () => run(...args)

	useEffect(() => {
		run(...args)
	}, [])

	return { loading, response, error, refresh, run }
}
