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
	id?: string
	bookThumbnail: string
	bookTitle: string
	bookAuthors: string
	writer: string
	contents: string
	score: number
	registerDate: string
	finishDate: string
	publisher?: string
}

interface ReviewBookType {
	bookThumbnail: string
	bookTitle: string
	bookAuthors: string
	bookIsbn: string
	publisher: string
}

interface SearchBookType {
	authors: []
	contents: string
	datetime: string
	isbn: string
	price: number
	publisher: string
	sale_price: number
	status: string
	thumbnail: string
	title: string
	translators: []
	url: string
}
