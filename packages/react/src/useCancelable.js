import { useMemo } from 'react'
import { makeCancelable } from '@refetty/fetch'

export const useCancelation = (handler, getCancel) =>
	useMemo(() => makeCancelable({ handler, getCancel }), [handler, getCancel])
