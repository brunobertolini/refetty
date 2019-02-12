import { BehaviorSubject } from 'rxjs'
import mitt from 'mitt'

const createAction = (_, action, name) => (...params) => {
	const ctx = _.getContext()
	_.state = _.getState()

	const result = action(_, ctx, ...params)
	_.emit(name, ...params)

	return result
}

const createActions = (_, actions) =>
	Object.keys(actions).reduce(
		(memo, name) => ({
			...memo,
			[name]: createAction(_, actions[name], name),
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
	const { emit, on, off } = mitt()

	const _ = {
		on,
		off,
		emit,
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

	_.read = createAction(_, load, 'read')
	_.setState = createAction(_, next(state, _.getState), 'setState')
	_.setContext = createAction(_, next(ctx, _.getContext), 'setContext')

	initial && _.read()

	const listner = on(
		'*',
		(name, ...params) => effects[name] && effects[name](_, ctx.value, ...params)
	)

	const destruct = () => {
		cancelSource && cancelSource.cancel()
		off(listner)
	}

	return {
		on,
		off,
		emit,
		...createActions(_, actions),
		read: _.read,
		getState: () => state,
		getContext: () => ctx,
		destruct,
	}
}
