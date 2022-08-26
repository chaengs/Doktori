/* eslint-disable no-useless-escape */
export const checkEmailRegExp = (email: string) => {
	const regExp =
		/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/
	const result = regExp.test(email)
	return result
}

export const checkPasswordRegExp = (password: string) => {
	// 최소 8자, 최소 하나의 문자와 숫자, 특수문자
	const regExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/
	const result = regExp.test(password)
	return result
}
