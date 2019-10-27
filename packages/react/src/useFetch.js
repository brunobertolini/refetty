import { usePromise } from './usePromise'

export const useFetch = (...args) => {
	const [result, ...meta] = usePromise(...args)
	return [result?.data, ...meta]
}
