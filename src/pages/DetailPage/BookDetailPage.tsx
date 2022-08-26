import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { palette } from 'styles/palette'
import { BookInfoType, ReviewType } from '../../types/bookType'
import { collection } from 'firebase/firestore'
import { firebaseDB } from '../../firebase-config'
import ReviewCard from 'components/ReviewCard'
import useSearchIsbn from 'hooks/useSearchIsbn'
import ButtonStyle from 'styles/ButtonStyle'
import { AdminAuthContext } from 'context/AdminAuthContext'

export default function BookDetailPage() {
	const [reviewCheck, setReviewCheck] = useState(false)
	const { state } = useLocation()
	const { thumbnail, title, authors, contents, datetime, publisher, isbn } = state as BookInfoType

	const navigate = useNavigate()

	const newDatetimeYear = datetime.slice(0, 4)
	const newDatetimeMonth = datetime.slice(5, 7)

	const { isLoggedIn } = useContext(AdminAuthContext)

	const moveToReviewEditor = () => {
		if (isLoggedIn) {
			navigate('/revieweditor', {
				state: {
					bookThumbnail: thumbnail,
					bookTitle: title,
					bookAuthors: authors,
					bookIsbn: isbn,
					publisher,
				},
			})
		} else {
			alert('로그인이 필요합니다.')
		}
	}

	//useSearchDB 커스텀 훅으로 쿼리 검색
	const reviewsCollectionRef = collection(firebaseDB, 'bookReviews')
	const reviewList = useSearchIsbn(reviewsCollectionRef, isbn)
	useEffect(() => {
		if (reviewList) {
			if (reviewList.length > 0) {
				setReviewCheck(true)
			} else {
				setReviewCheck(false)
			}
		}
	}, [reviewList])

	return (
		<BookInfoContainer>
			<BookInfoBox>
				<img src={thumbnail} alt={title} />
				<div>
					<Title>
						<strong>{title}</strong>
					</Title>
					<p>{authors} 지음</p>
					<p>{publisher} 펴냄</p>
					<p>
						{newDatetimeYear}년 {newDatetimeMonth}월 출간
					</p>
					<p>ISBN {isbn}</p>
					<p>{contents} ...</p>
				</div>
			</BookInfoBox>
			<ButtonStyle onClick={moveToReviewEditor}>리뷰 작성하기</ButtonStyle>
			<ReviewListTitle>다른 독자들의 감상을 살펴보세요.</ReviewListTitle>
			{reviewCheck ? (
				reviewList.map((review: ReviewType) => (
					<ReviewCard
						key={review.id}
						bookThumbnail={review.bookThumbnail}
						bookTitle={review.bookTitle}
						bookAuthors={review.bookAuthors}
						writer={review.writer}
						contents={review.contents}
						score={review.score}
						registerDate={review.registerDate}
						finishDate={review.finishDate}
						publisher={publisher}
						id={review.id}
					/>
				))
			) : (
				<NoReview>등록된 독후감이 없습니다. 가장 먼저 감상을 적어보세요.</NoReview>
			)}
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

const ReviewListTitle = styled.p`
	text-align: center;
	font-size: 25px;
	margin-top: 10px;
	padding-top: 10px;
	display: block;
`

const NoReview = styled.p`
	font-size: 18px;
	text-align: center;
	background-color: ${palette.textBackgroundColor};
	margin-top: 30px;
	padding-top: 10px;
`
