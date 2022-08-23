export interface BookInfoType {
	thumbnail: string
	title: string
	authors: string[]
	contents: string
	datetime: string
	publisher: string
	isbn: string
}
interface ReviewType {
	id: string
	bookThumbnail: string
	bookTitle: string
	bookAuthors: string
	bookIsbn: string
	writer: string
	title: string
	contents: string
	date: string
	// score: number
	writerId: string
}

interface ReviewBookType {
	bookThumbnail: string
	bookTitle: string
	bookAuthors: string
	bookIsbn: string
	publisher: string
}
