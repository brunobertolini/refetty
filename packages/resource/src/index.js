import { BehaviorSubject } from 'rxjs'

const createAction = (_, action, effect) => (...params) => {
	const ctx = _.getContext()
	_.state = _.getState()

	const result = action(_, ctx, ...params)
	effect && effect(_, ctx, ...params)

	return result
}

const createActions = (_, actions, effects) =>
	Object.keys(actions).reduce(
		(memo, name) => ({
			...memo,
			[name]: createAction(_, actions[name], effects[name]),
		}),
		{}
	)

const load = async (_, ctx) => {
	;(!_.state.loading || _.state.error) && _.setState({ loading: true })

	try {
		_.refreshCancelSource()
		const response = await _.source(_, ctx)
		_.setState({ loading: false, ..._.modifier(_, ctx, response) })
	} catch (error) {
		_.setState({ loading: false, error })
	}
}

const next = (state, prev) => (_, ctx, ...params) =>
	state.next(
		...(typeof params[0] === 'function' ? [params[0](prev())] : params)
	)

export const createResource = ({
	initial,
	context,
	source,
	modifier,
	effects,
	actions,
	cancelToken,
}) => {
	const ctx = new BehaviorSubject(
		typeof context === 'function' ? context() : context
	)
	const state = new BehaviorSubject({ loading: !!initial })
	let cancelSource = null

	const _ = {
		source,
		modifier,
		getCancelToken: () => cancelSource.token,
		getState: () => state.value,
		getContext: () => ctx.value,
	}

	_.refreshCancelSource = () => {
		cancelSource && cancelSource.cancel()
		cancelSource = cancelToken(_, ctx.value)
		return cancelSource
	}

	_.read = createAction(_, load, effects.read)
	_.setState = createAction(_, next(state, _.getState), effects.setState)
	_.setContext = createAction(_, next(ctx, _.getContext), effects.setContext)

	initial && _.read()

	return {
		...createActions(_, actions, effects),
		read: _.read,
		getState: () => state,
		getContext: () => ctx,
		cancel: cancelSource && cancelSource.cancel,
	}
}
