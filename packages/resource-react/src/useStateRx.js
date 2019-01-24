import { useState, useEffect } from 'react'

export const useStateRx = rx => {
	const [state, setState] = useState(rx.value)

	useEffect(() => {
		const subs = rx.subscribe(value => value !== state && setState(value))
		return () => rx.unsubscribe(subs)
	}, [])

	return [state, rx.next]
}
