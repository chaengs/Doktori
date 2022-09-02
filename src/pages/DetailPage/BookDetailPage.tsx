import React, { SyntheticEvent, useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { collection, DocumentData } from 'firebase/firestore'

import { firebaseDB } from '../../firebase-config'

import { AdminAuthContext } from 'context/AdminAuthContext'

import ReviewCard from 'pages/DetailPage/components/ReviewCard'
import useSearchBook from 'hooks/useSearchBook'
import useSearchDB from 'hooks/useSearchDB'

import { BookInfoType } from '../../types/bookType'
import { ReviewCardType } from 'types/review'

import styled from 'styled-components'
import ButtonStyle from 'styles/ButtonStyle'
import { theme } from 'styles/theme'
import { NoImageContext } from 'context/NoImageContext'

export default function BookDetailPage() {
	const navigate = useNavigate()
	const { state } = useLocation()
	const { title } = state as BookInfoType

	const [reviewCheck, setReviewCheck] = useState(false)
	const [bookInfo, setBookInfo] = useState<DocumentData>()

	const { onErrorImage } = useContext(NoImageContext)

	const newDatetimeYear = bookInfo?.datetime.slice(0, 4)
	const newDatetimeMonth = bookInfo?.datetime.slice(5, 7)

	const { isLoggedIn } = useContext(AdminAuthContext)

	const moveToReviewEditor = () => {
		if (isLoggedIn) {
			navigate('/createReview', {
				state: {
					bookThumbnail: bookInfo?.thumbnail,
					bookTitle: title,
					bookAuthors: bookInfo?.authors,
					bookIsbn: bookInfo?.isbn,
					publisher: bookInfo?.publisher,
				},
			})
		} else {
			alert('로그인이 필요합니다.')
		}
	}

	//api 도서 정보 검색
	const apiResult = useSearchBook(title, 1)
	useEffect(() => {
		apiResult && setBookInfo(apiResult[0])
	}, [apiResult])

	//useSearchDB 커스텀 훅으로 리뷰 쿼리 검색
	const reviewsCollectionRef = collection(firebaseDB, 'bookReviews')
	const reviewList = useSearchDB(reviewsCollectionRef, 'bookTitle', title)

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
				<Book>
					<img src={bookInfo?.thumbnail} alt={bookInfo?.title} onError={onErrorImage}></img>
					<div>
						<Title>
							<strong>{bookInfo?.title}</strong>
						</Title>
						<p>{bookInfo?.authors} 지음</p>
						<p>{bookInfo?.publisher} 펴냄</p>
						<p>
							{newDatetimeYear}년 {newDatetimeMonth}월 출간
						</p>
						<p>ISBN {bookInfo?.isbn}</p>
					</div>
				</Book>
				<Content>{bookInfo?.contents}</Content>
			</BookInfoBox>
			<ButtonStyle onClick={moveToReviewEditor}>리뷰 작성하기</ButtonStyle>
			<ReviewListTitle>다른 독자들의 감상을 살펴보세요.</ReviewListTitle>
			{reviewCheck && reviewList ? (
				reviewList.map((review: ReviewCardType) => (
					<ReviewCard
						key={review.id}
						bookThumbnail={review.bookThumbnail}
						bookTitle={review.bookTitle}
						writer={review.writer}
						contents={review.contents}
						score={review.score}
						registerDate={review.registerDate}
						writerId={review.writerId}
						reviewId={review.id}
						id={''}
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
	background-color: ${theme.color.ivory};
	border-radius: 20px;
	box-shadow: 0px 0px 5px 10px rgba(0, 0, 0, 0.2);
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position: relative;
	top: 5%;
	${({ theme }) => theme.media.mobile`
		width: 96%;
		height: auto;
		top:10px;
		padding:10px;
 	`}
`

const BookInfoBox = styled.section`
	display: flex;
	flex-direction: column;
	align-items: center;
	top: 5%;
`

const Book = styled.div`
	width: 90%;
	font-size: 20px;
	margin-bottom: 10px;
	display: flex;
	align-items: center;
	img {
		width: 200px;
		height: auto;
	}

	div {
		margin-left: 15px;
	}
	p {
		margin-bottom: 5px;
	}

	${({ theme }) => theme.media.mobile`
		font-size:${theme.fontSize.mobileDesc};
		img {
			width:100px;
		}
 	`}
`

const Title = styled.p`
	font-size: ${theme.fontSize.desktopTitle};

	${({ theme }) => theme.media.mobile`
			font-size:${theme.fontSize.mobileTitle}
		 `}
`

const Content = styled.p`
	width: 90%;
	font-size: ${theme.fontSize.desktopDesc};

	${({ theme }) => theme.media.mobile`
		font-size:${theme.fontSize.mobileDesc};
 	`}
`

const ReviewListTitle = styled.p`
	text-align: center;
	font-size: 25px;
	margin-top: 10px;
	padding-top: 10px;
	display: block;

	${({ theme }) => theme.media.mobile`
		font-size:${theme.fontSize.mobileTitle};
 	`}
`

const NoReview = styled.p`
	font-size: 18px;
	text-align: center;
	background-color: ${theme.color.lightYellowgreen};
	margin-top: 30px;
	padding-top: 10px;

	${({ theme }) => theme.media.mobile`
		font-size:${theme.fontSize.mobileDesc};
		margin-top:10px;
 	`}
`
