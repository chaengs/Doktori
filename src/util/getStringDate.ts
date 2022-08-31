export const getStringDate = (date: any) => {
	const offset = date.getTimezoneOffset() * 60000
	const today = new Date(date - offset)
	return today.toISOString().slice(0, 10)
}
