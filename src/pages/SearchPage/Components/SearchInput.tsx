import { bookSearch } from 'library/api/api'
import React, { useEffect, useRef, useState } from 'react'

export default function SearchInput() {
	const [result, setResult] = useState<any[]>()
	const [inputValue, setInputValue] = useState('')
	const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>

	const bookSearchHandler = async (query: string) => {
		event?.preventDefault()
		const params = {
			query: query,
		}
		const searchData = await bookSearch(params)
		// const data = JSON.stringify(searchData)
		const data = searchData.data.documents
		setResult(data)
	}

	const inutValueHandler = () => {
		setInputValue(inputRef.current.value)
	}

	useEffect(() => {
		if (inputValue.length > 0) {
			bookSearchHandler(inputValue)
		}
	}, [inputValue])
	return (
		<form onSubmit={inutValueHandler}>
			<input type='text' placeholder='도서명 또는 작가를 검색하세요.' ref={inputRef} />
		</form>
	)
}
