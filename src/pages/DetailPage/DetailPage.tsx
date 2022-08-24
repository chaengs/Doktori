import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { palette } from 'styles/palette'
import { BookInfoType, ReviewType } from '../../types/bookType'
import { collection } from 'firebase/firestore'
import { firebaseDB } from '../../Firebase'
import useSearchDB from 'hooks/useSearchDB'

export default function DetailPage() {
	const { state } = useLocation()
	const { thumbnail, title, authors, contents, datetime, publisher, isbn } = state as BookInfoType

	const navigate = useNavigate()

	const newDatetimeYear = datetime.slice(0, 4)
	const newDatetimeMonth = datetime.slice(5, 7)

	const moveToReviewEditor = () => {
		navigate('/revieweditor', {
			state: {
				bookThumbnail: thumbnail,
				bookTitle: title,
				bookAuthors: authors,
				bookIsbn: isbn,
				publisher,
			},
		})
	}

	//useSearchDB 커스텀 훅으로 쿼리 검색
	const reviewsCollectionRef = collection(firebaseDB, 'bookReviews')
	const reviews = useSearchDB(reviewsCollectionRef, isbn)

	const reviewList = reviews.map((review: ReviewType) => (
		<p key={review.id}>
			제목: {review.title} 내용: {review.contents}
		</p>
	))
	return (
		<BookInfoContainer>
			<BookInfoBox>
				<img src={thumbnail} alt={title} />
				<div>
					<Title>{title}</Title>
					<p>{authors} 지음</p>
					<p>{publisher} 펴냄</p>
					<p>
						{newDatetimeYear}년 {newDatetimeMonth}월 출간
					</p>
					<p>{contents} ...</p>
				</div>
			</BookInfoBox>
			<ReviewButton onClick={moveToReviewEditor}>리뷰 작성하기</ReviewButton>
		</BookInfoContainer>
	)
}

const BookInfoContainer = styled.article`
	width: 80%;
	height: 80%;
	background-color: ${palette.backgroundWhiteColor};
	border-radius: 20px;
	box-shadow: 0px 0px 5px 10px rgba(0, 0, 0, 0.2);
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position: relative;
	top: 5%;
`

const BookInfoBox = styled.section`
	font-size: 20px;
	display: flex;
	justify-content: center;
	align-items: center;
	/* width: 100%; */
	top: 5%;
	img {
		width: 200px;
		height: auto;
	}

	div {
		width: 50%;
		margin-left: 15px;
	}
	p {
		margin-bottom: 5px;
	}
`

const Title = styled.p`
	font-size: 30px;
`

const ReviewButton = styled.button`
	width: 140px;
	height: 40px;
	color: #fff;
	font-size: 20px;
	font-weight: bold;
	border-radius: 7px;
	margin-top: 20px;
	background-color: ${palette.buttonOnColor};
`
