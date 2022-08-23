import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
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
	const { bookThumbnail, bookTitle, bookAuthors, bookIsbn } = state as ReviewBookType

	const [reviewTitle, setReviewTitle] = useState('')
	const [content, setContent] = useState('')
	const [reviews, setReviews] = useState<ReviewType | any>([]) // 나중에 타입 바꾸기
	const [date, setDate] = useState<string | number | readonly string[]>(getStringDate(new Date()))

	const [hovered, setHovered] = useState(0)
	const [score, setScore] = useState(0)

	const reviewsCollectionRef = collection(firebaseDB, 'bookReviews')

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

		await addDoc(reviewsCollectionRef, {
			bookThumbnail: bookThumbnail,
			bookTitle: bookTitle,
			bookAuthors: bookAuthors,
			bookIsbn: bookIsbn,
			writer: writer,
			title: reviewTitle,
			contents: content,
			score: score,
			registerDate: getStringDate(new Date()),
			finishDate: date,
			writerId: writerId,
		})

		getReview()
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
					<p>{bookTitle}</p>
					<p>{bookAuthors}</p>
				</div>
			</BookInfoContainer>
			<ReviewEditorContainer>
				<input
					className='input_date'
					type='date'
					value={date}
					onChange={(e) => setDate(e.target.value)}
				/>
				<input
					type='text'
					placeholder='글제목'
					onChange={(event) => {
						setReviewTitle(event.target.value)
					}}
				/>
				<textarea
					placeholder='리뷰작성'
					onChange={(event) => {
						setContent(event.target.value)
					}}
				/>
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
				<button onClick={createReview}>리뷰 올리기</button>
				{reviews && reviewList}
			</ReviewEditorContainer>
		</ReviewContainer>
	)
}

const ReviewContainer = styled.article``

const BookInfoContainer = styled.section``

const BookDescription = styled.div``

const ReviewEditorContainer = styled.section``
const ScoreBox = styled.div`
	text-align: center;
	border: none;
	.acorn {
		margin: 20px 10px 20px 0;
		opacity: 0.2;
		/* color: #999; */
		cursor: pointer;
		font-size: 30px;
	}

	.green {
		color: ${palette.mainColor};
		opacity: 1;
	}
`
