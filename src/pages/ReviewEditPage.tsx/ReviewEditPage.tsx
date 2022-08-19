import { addDoc, collection, getDocs } from 'firebase/firestore'
import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { firebaseDB } from '../../Firebase'
import { ReviewBookType } from '../../types/bookType'

export default function ReviewEditPage() {
	type testType = {
		title: string
		contents: string
	}
	//BookCard 컴포넌트에서 prop 받아옴
	const { state } = useLocation()
	const { bookThumbnail, bookTitle, bookAuthors } = state as ReviewBookType

	const [reviewTitle, setReviewTitle] = useState('')
	const [Content, setContent] = useState('')
	const [reviews, setReviews] = useState<testType | any>([]) // 나중에 타입 바꾸기

	const reviewsCollectionRef = collection(firebaseDB, 'test')

	const createReview = async () => {
		const userUid = localStorage.getItem('uid')
		const writer = localStorage.getItem('email')
		await addDoc(reviewsCollectionRef, { title: reviewTitle, contents: Content })
		// await addDoc(reviewsCollectionRef, { title: newTitle, contents: newContent, uid: uid, writer:writer, bookThumbnail:bookThumbnail, bookTitle:bookTitle, bookAuthors:bookAuthors })
	}

	useEffect(() => {
		const getReviews = async () => {
			const data = await getDocs(reviewsCollectionRef)
			// console.log(data)
			const newData = data.docs.map((doc) => ({ ...doc.data() })) //나중에 아이디 추가하기
			setReviews(newData)
		}

		getReviews()
	}, [reviews])

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
