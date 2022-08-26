import React, { useEffect, useRef, useState } from 'react'
import BookCard from '../../components/BookCard'
import { bookSearch } from '../../library/api/api'
import styled from 'styled-components'
import { palette } from 'styles/palette'

export default function SearchPage() {
	const [result, setResult] = useState<any[]>()
	const [inputValue, setInputValue] = useState('')
	const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>

	const bookSearchHandler = async (query: string) => {
		event?.preventDefault()
		const params = {
			query: query,
			size: 30,
		}
		const searchData = await bookSearch(params)
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
			<SearchBarContainer onSubmit={inutValueHandler}>
				<SearchBarInput type='text' placeholder='도서명 또는 작가를 검색하세요.' ref={inputRef} />
			</SearchBarContainer>
			{result && (
				<BookCardContainer>
					{result.map((data, index) => (
						<BookCard
							key={`${data.isbn}_${index}`}
							thumbnail={data.thumbnail}
							title={data.title}
							authors={data.authors}
							contents={data.contents}
							datetime={data.datetime}
							publisher={data.publisher}
							isbn={data.isbn}
						/>
					))}
				</BookCardContainer>
			)}
		</>
	)
}

const SearchBarContainer = styled.form`
	text-align: center;
	margin-bottom: 20px;
`

const SearchBarInput = styled.input`
	width: 30vw;
	height: 40px;
	font-size: 20px;
	border: 2px solid ${palette.pointColor};
	border-radius: 7px;
	padding-left: 10px;
	padding-right: 10px;
	margin: 0 auto;
	::placeholder {
		text-align: center;
	}
	//
`
const BookCardContainer = styled.ul`
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
`
