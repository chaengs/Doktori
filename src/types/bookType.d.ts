export interface BookInfoType {
	thumbnail: string
	title: string
	authors: string
	contents: string
	datetime: string
	publisher: string
}
// interface ReviewType {
// 	bookAuthors: string
// 	bookIsbn: string
// 	bookThumbnail: string
// 	bookTitle: string
// 	content: string
// 	date: string
// 	reviewId: string
// 	score: number
// 	writer: string
// 	writerId: string
// }

interface ReviewBookType {
	bookThumbnail: string
	bookTitle: string
	bookAuthors: string
}
