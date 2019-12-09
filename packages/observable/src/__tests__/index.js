import { observable } from '~/'

test('should set initial value', () => {
	const subject = observable('initial')
	expect(subject.value).toEqual('initial')
})

test('should change value on call next with string', () => {
	const subject = observable('initial')
	subject.next('next')
	expect(subject.value).toEqual('next')
})

test('should change value on call next with funciton', () => {
	const subject = observable('initial')
	subject.next(v => `${v}next`)
	expect(subject.value).toEqual('initialnext')
})

test('should add listner to subject', () => {
	let called = false
	const subject = observable('initial')

	subject.subscribe(value => {
		called = true
		expect(value).toEqual('next')
	})

	subject.next('next')
	expect(called).toBeTruthy()
})

test('should remove listner from subject', () => {
	let called = false
	const subject = observable('initial')

	const lisnter = subject.subscribe(() => {
		called = true
	})

	subject.unsubscribe(lisnter)
	subject.next('next')

	expect(called).toBeFalsy()
})

test('should remove specific listner from subject', () => {
	let called = false
	const subject = observable('initial')

	const lisnter = subject.subscribe(value => {
		expect(value).toEqual('next')
	})

	const lisnterToRemove = subject.subscribe(() => {
		called = true
	})

	subject.unsubscribe(lisnterToRemove)
	subject.next('next')

	expect(called).toBeFalsy()
})
