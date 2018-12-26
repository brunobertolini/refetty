import { useState, useEffect } from 'react'

export function useAsync(promise) {
	const [error, setError] = useState(false)
	const [data, setData] = useState([])
	const [loading, setLoading] = useState(false)

	const refresh = async () => {
		setLoading(true)

		try {
			const { data } = await promise()
			setData(data)
		} catch (err) {
			setError(err)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		refresh()
	}, [])

	return { loading, data, error, refresh }
}
