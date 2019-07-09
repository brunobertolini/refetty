import { useMemo } from 'react'
import { makeCancelable } from '@refetty/fetch'

export const useCancelation = (promise, getCancel) =>
	useMemo(() => makeCancelable({ promise, getCancel }), [promise, getCancel])
