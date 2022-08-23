export const getStringDate = (date: Date) => {
	return date.toISOString().slice(0, 10)
}
