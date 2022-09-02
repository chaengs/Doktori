import React from 'react'
import styled from 'styled-components'
import { ReviewEditorBookInfo } from 'types/bookType'
import { ReviewType } from 'types/review'

interface BookInfoType {
	bookInfo: ReviewType | ReviewEditorBookInfo | undefined
}

function BookContainer({ bookInfo }: BookInfoType) {
	return (
		<BookInfoContainer>
			<img src={bookInfo?.bookThumbnail} alt='책 표지' />
			<div>
				<BookTitle>{bookInfo?.bookTitle}</BookTitle>
				<p>{bookInfo?.bookAuthors} 지음</p>
				<p>{bookInfo?.publisher} 펴냄</p>
			</div>
		</BookInfoContainer>
	)
}

const BookInfoContainer = styled.section`
	font-size: 20px;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-bottom: 10px;
	img {
		width: 120px;
		height: auto;
	}

	div {
		margin-left: 20px;
	}

	p {
		margin-bottom: 10px;
	}
`

const BookTitle = styled.p`
	font-size: 30px;
`

export default React.memo(BookContainer)
