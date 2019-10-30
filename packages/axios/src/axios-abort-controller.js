import axios from 'axios'

export function AxiosAbortController() {
	const source = axios.CancelToken.source()

	return {
		signal: source.token,
		abort: source.cancel,
		isAborted: axios.isCancel,
	}
}
