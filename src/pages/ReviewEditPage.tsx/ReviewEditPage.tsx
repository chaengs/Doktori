import { addDoc, collection, getDocs, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { firebaseDB } from '../../Firebase'

import { ReviewBookType } from '../../types/bookType'
import { ReviewType } from '../../types/bookType'
import { getStringDate } from 'util/getStringDate'

export default function ReviewEditPage() {
	//BookCard 컴포넌트에서 prop 받아옴
	const { state } = useLocation()
	const { bookThumbnail, bookTitle, bookAuthors, bookIsbn } = state as ReviewBookType

	const [reviewTitle, setReviewTitle] = useState('')
	const [content, setContent] = useState('')
	const [reviews, setReviews] = useState<ReviewType | any>([]) // 나중에 타입 바꾸기
	const [date, setDate] = useState<string | number | readonly string[]>(getStringDate(new Date()))

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
			registerDate: getStringDate(new Date()),
			finishDate: date,
			writerId: writerId,
		})

		getReview()
	}

	useEffect(() => {
		getReview()
		reviewList
	}, [])

	const reviewList = reviews.map((review: ReviewType) => (
		<p key={review.id}>
			제목: {review.title} 내용: {review.contents}
		</p>
	))
	return (
		<>
			<section>
				<p>{bookTitle}</p>
				<p>{bookAuthors}</p>
				<img src={bookThumbnail} />
			</section>
			<section>
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
				<button onClick={createReview}>리뷰 올리기</button>
				{reviews && reviewList}
			</section>
		</>
	)
}
