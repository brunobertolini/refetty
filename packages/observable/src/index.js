export const observable = (initialValue) => {
	const listners = []

	return {
		value: initialValue,

		subscribe(fn) {
			listners.push(fn)
			return listners.length - 1
		},

		unsubscribe(idx) {
			return listners.splice(idx, 1)
		},

		next(value) {
			this.value = typeof value === 'function' ? value(this.value) : value
			listners.forEach((fn) => fn(this.value))
			return this.value
		},
	}
}
