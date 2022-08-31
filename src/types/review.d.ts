export interface ReviewCardType {
	id: string
	bookThumbnail: string
	bookTitle: string
	writer: string
	contents: string
	score: number
	registerDate: string
	writerId: string
	reviewId: string
}

interface ReviewType {
	id: string
	reviewId: string
	bookThumbnail: string
	bookTitle: string
	bookAuthors: string
	writer: string
	writerId: string
	contents: string
	score: number
	registerDate: string
	finishDate: string
	publisher?: string
}
