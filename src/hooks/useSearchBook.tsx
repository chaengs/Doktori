import { DocumentData } from 'firebase/firestore'

import { bookSearch } from 'library/api/api'
import { useEffect, useState } from 'react'

export default function useSearchBook(query: string, size: number) {
	const [data, setData] = useState<DocumentData[] | any>()

	const SearchBookHandler = async () => {
		event?.preventDefault()
		const params = {
			query: query,
			size: size,
		}
		const searchData = await bookSearch(params)
		const result = searchData.data.documents
		result && setData(result)
	}

	useEffect(() => {
		SearchBookHandler()
	}, [])
	return data
}
