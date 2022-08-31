import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { collection } from 'firebase/firestore'
import { firebaseDB } from '../../firebase-config'
import ReviewCard from 'pages/DetailPage/components/ReviewCard'
import { AdminAuthContext } from 'context/AdminAuthContext'
import useSearchReviewByTitle from 'hooks/useSearchReviewByTitle'
import useSearchBook from 'hooks/useSearchBook'
import { BookInfoType, SearchBookType } from '../../types/bookType'
import styled from 'styled-components'
import { palette } from 'styles/palette'
import ButtonStyle from 'styles/ButtonStyle'
import { ReviewCardType } from 'types/review'

export default function BookDetailPage() {
	const navigate = useNavigate()
	const { state } = useLocation()
	const { title } = state as BookInfoType

	const [reviewCheck, setReviewCheck] = useState(false)
	const [bookInfo, setBookInfo] = useState<SearchBookType>()

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
	const reviewList = useSearchReviewByTitle(title)
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
				<img src={bookInfo?.thumbnail} alt={bookInfo?.title} />
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
					<p>{bookInfo?.contents} ...</p>
				</div>
			</BookInfoBox>
			<ButtonStyle onClick={moveToReviewEditor}>리뷰 작성하기</ButtonStyle>
			<ReviewListTitle>다른 독자들의 감상을 살펴보세요.</ReviewListTitle>
			{reviewCheck ? (
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
