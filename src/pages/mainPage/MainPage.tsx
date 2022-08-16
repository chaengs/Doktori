import React, { useEffect, useRef, useState } from 'react'
import { bookSearch } from '../../library/api/api'

export default function MainPage() {
	const [result, setResult] = useState<any[]>()
	const [inputValue, setInputValue] = useState('')
	const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>

	const bookSearchHandler = async () => {
		event?.preventDefault()
		const query = inputRef.current.value
		const params = {
			query: query,
		}
		const searchData = await bookSearch(params)
		// const data = JSON.stringify(searchData)
		const data = searchData.data.documents
		setResult(data)
	}

	return (
		<>
			<form onSubmit={bookSearchHandler}>
				<input type='text' placeholder='도서명 또는 작가를 검색하세요.' ref={inputRef} />
			</form>
			{result && (
				<ul>
					{result.map((data, index) => (
						<li key={`${data.isbn}_${index}`}>{data.title}</li>
					))}
				</ul>
			)}
		</>
	)
}
