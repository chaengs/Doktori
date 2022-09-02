import { NoImageContext } from 'context/NoImageContext'
import React, { useContext } from 'react'
import styled from 'styled-components'
import { theme } from 'styles/theme'
import { ReviewEditorBookInfo } from 'types/bookType'
import { ReviewType } from 'types/review'

interface BookInfoType {
	bookInfo: ReviewType | ReviewEditorBookInfo | undefined
}

function BookContainer({ bookInfo }: BookInfoType) {
	const { onErrorImage } = useContext(NoImageContext)

	return (
		<BookInfoContainer>
			<img src={bookInfo?.bookThumbnail} alt='책 표지' onError={onErrorImage} />
			<div>
				<BookTitle>{bookInfo?.bookTitle}</BookTitle>
				<p>{bookInfo?.bookAuthors} 지음</p>
				<p>{bookInfo?.publisher} 펴냄</p>
			</div>
		</BookInfoContainer>
	)
}

export default React.memo(BookContainer)

const BookInfoContainer = styled.section`
	font-size: ${theme.fontSize.desktopDesc};
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

	${({ theme }) => theme.media.mobile`
		font-size:${theme.fontSize.mobileDesc};
		width:95%;
		margin:0 auto;
		img {
			width:100px;
		}
 	`}
`

const BookTitle = styled.p`
	font-size: ${theme.fontSize.desktopTitle};
	${({ theme }) => theme.media.mobile`
		font-size:${theme.fontSize.mobileTitle};
 	`}
`
