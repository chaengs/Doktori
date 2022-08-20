import React, { useEffect, useRef, useState } from 'react'
import BookCard from '../../components/BookCard'
import { bookSearch } from '../../library/api/api'

export default function MainPage() {
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
		<>
			<form onSubmit={inutValueHandler}>
				<input type='text' placeholder='도서명 또는 작가를 검색하세요.' ref={inputRef} />
			</form>
			{result && (
				<ul>
					{result.map((data, index) => (
						<BookCard
							key={`${data.isbn}_${index}`}
							thumbnail={data.thumbnail}
							title={data.title}
							authors={data.authors}
							contents={data.contents}
							datetime={data.datetime}
							publisher={data.publisher}
						/>
					))}
				</ul>
			)}
		</>
	)
}
