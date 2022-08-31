import { bookSearch } from 'library/api/api'
import { useEffect, useState } from 'react'
import { SearchBookType } from 'types/bookType'

export default function useSearchBook(query: string, size: number) {
	const [data, setData] = useState<SearchBookType[] | any>()

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
		console.log(data)
	}, [])
	return data
}
