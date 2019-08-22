import { useMemo } from 'react'
import { makeCancelable } from '@refetty/fetch'

export const useCancelation = (promise, cancelMessage) =>
	useMemo(() => makeCancelable(promise, cancelMessage), [
		promise,
		cancelMessage,
	])
