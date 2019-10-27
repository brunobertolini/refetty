import axios from 'axios'

export function AxiosAbortController() {
	const source = axios.CancelToken.source()

	this.signal = source.token
	this.abort = source.cancel
	this.isAborted = axios.isCancel
}
