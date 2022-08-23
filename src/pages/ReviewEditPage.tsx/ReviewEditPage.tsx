import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { firebaseDB } from '../../Firebase'
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore'

import { ReviewBookType } from '../../types/bookType'
import { ReviewType } from '../../types/bookType'
import { getStringDate } from 'util/getStringDate'

import { GiAcorn } from 'react-icons/gi'
import { palette } from 'styles/palette'

export default function ReviewEditPage() {
	//BookCard 컴포넌트에서 prop 받아옴
	const { state } = useLocation()
	const { bookThumbnail, bookTitle, bookAuthors, bookIsbn, publisher } = state as ReviewBookType

	const [reviewTitle, setReviewTitle] = useState('')
	const [content, setContent] = useState('')
	const [reviews, setReviews] = useState<ReviewType | any>([]) // 나중에 타입 바꾸기
	const [date, setDate] = useState<string | number | readonly string[]>(getStringDate(new Date()))

	const [hovered, setHovered] = useState(0)
	const [score, setScore] = useState(0)

	const reviewsCollectionRef = collection(firebaseDB, 'bookReviews')

	const navigate = useNavigate()

	// 조건에 맞는 리뷰 가져옴
	const getReview = async () => {
		const dateByQuery = query(reviewsCollectionRef, where('bookIsbn', '==', bookIsbn))
		const data = await getDocs(dateByQuery)
		// console.log(data)
		const newData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
		setReviews(newData)
	}

	const createReview = async () => {
		//localstorage에서 유저정보 받아옴
		const writerId = localStorage.getItem('uid')
		const writer = localStorage.getItem('email')
		try {
			await addDoc(reviewsCollectionRef, {
				bookThumbnail: bookThumbnail,
				bookTitle: bookTitle,
				bookAuthors: bookAuthors,
				bookIsbn: bookIsbn,
				writer: writer,
				// title: reviewTitle,
				contents: content,
				score: score,
				registerDate: getStringDate(new Date()),
				finishDate: date,
				writerId: writerId,
			})
			alert('당신의 다독을 응원할게요!')
			navigate('/main')
		} catch (error) {
			if (error instanceof Error) {
				console.log(error.message)
			}
		}

		// getReview()
	}

	useEffect(() => {
		getReview()
	}, [])

	const reviewList = reviews.map((review: ReviewType) => (
		<p key={review.id}>
			제목: {review.title} 내용: {review.contents}
		</p>
	))
	return (
		<ReviewContainer>
			<BookInfoContainer>
				<img src={bookThumbnail} alt={bookTitle} />
				<div>
					<BookTitle>{bookTitle}</BookTitle>
					<p>{bookAuthors} 지음</p>
					<p>{publisher} 펴냄</p>
				</div>
			</BookInfoContainer>
			<ReviewEditorContainer>
				<ScoreBox>
					{[1, 2, 3, 4, 5].map((el) => (
						<GiAcorn
							className={`acorn ${(score >= el || hovered >= el) && 'green'}`}
							key={el}
							onMouseEnter={() => setHovered(el)}
							onMouseLeave={() => setHovered(0)}
							onClick={() => setScore(el)}
						/>
					))}
				</ScoreBox>
				<DateBox>
					<p>완독 날짜</p>
					<DateInput
						className='input_date'
						type='date'
						value={date}
						onChange={(e) => setDate(e.target.value)}
					/>
				</DateBox>
				{/* <ContentInput
					type='text'
					placeholder=''
					onChange={(event) => {
						setReviewTitle(event.target.value)
					}}
				/> */}
				<ContentInput
					placeholder='독서는 즐거우셨나요? 여러분의 감상을 적어주세요.'
					onChange={(event) => {
						setContent(event.target.value)
					}}
				/>
				<SubmitButton onClick={createReview}>독후감 작성 완료</SubmitButton>
				{/* {reviews && reviewList} */}
			</ReviewEditorContainer>
		</ReviewContainer>
	)
}

const ReviewContainer = styled.article`
	width: 80%;
	height: 80%;
	background-color: ${palette.backgroundWhiteColor};
	border-radius: 20px;
	box-shadow: 0px 0px 5px 10px rgba(0, 0, 0, 0.2);
	margin: 0 auto;
	padding: 100px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	position: relative;
	top: 5%;
`

const BookInfoContainer = styled.section`
	font-size: 20px;
	display: flex;
	justify-content: center;
	align-items: center;
	img {
		width: 100px;
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

const ReviewEditorContainer = styled.section`
	display: flex;
	flex-direction: column;
	align-items: center;
`
const ScoreBox = styled.div`
	/* text-align: center; */
	.acorn {
		font-size: 30px;
		opacity: 0.3;
		margin: 20px 10px 20px 0;
		/* color: #999; */
		cursor: pointer;
	}

	.green {
		color: ${palette.mainColor};
		opacity: 1;
	}
`
const DateBox = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 20px;
	p {
		font-size: 20px;
		margin-right: 10px;
	}
`
const DateInput = styled.input`
	width: auto;
	height: 40px;
	font-size: 18px;
	border: 2px solid ${palette.mainColor};
	border-radius: 7px;
	padding: 5px;
`

const ContentInput = styled.textarea`
	width: 700px;
	height: 30vh;
	font-size: 20px;
	padding: 10px;
	border: 2px solid ${palette.mainColor};
	border-radius: 7px;
`
const SubmitButton = styled.button`
	width: 140px;
	height: 40px;
	color: #fff;
	font-size: 20px;
	font-weight: bold;
	background-color: ${palette.buttonColor};
	border-radius: 7px;
	margin-top: 20px;
`
