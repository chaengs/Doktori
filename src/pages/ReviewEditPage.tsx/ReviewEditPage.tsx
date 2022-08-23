import { addDoc, collection, getDocs, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { firebaseDB } from '../../Firebase'
import { ReviewBookType } from '../../types/bookType'

import { getStringDate } from 'util/getStringDate'

export default function ReviewEditPage() {
	type testType = {
		title: string
		contents: string
	}
	//BookCard 컴포넌트에서 prop 받아옴
	const { state } = useLocation()
	const { bookThumbnail, bookTitle, bookAuthors, bookIsbn } = state as ReviewBookType

	const [reviewTitle, setReviewTitle] = useState('')
	const [content, setContent] = useState('')
	const [reviews, setReviews] = useState<testType | any>([]) // 나중에 타입 바꾸기

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
		// await addDoc(reviewsCollectionRef, { ...state })
		await addDoc(reviewsCollectionRef, {
			bookThumbnail: bookThumbnail,
			bookTitle: bookTitle,
			bookAuthors: bookAuthors,
			bookIsbn: bookIsbn,
			title: reviewTitle,
			contents: content,
			writerId: writerId,
			writer: writer,
			date: getStringDate(new Date()),
		})

		getReview()
	}

	useEffect(() => {
		getReview()
		reviewList
	}, [])

	const reviewList = reviews.map((review: testType, index: number) => (
		<p key={index}>
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
