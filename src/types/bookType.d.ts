export interface BookInfoType {
	thumbnail: string
	title: string
	authors: string[]
	contents: string
	publisher: string
	isbn: string
}

interface ReviewEditorBookInfo {
	bookThumbnail: string
	bookTitle: string
	bookAuthors: []
	bookIsbn: string
	publisher: string
}
