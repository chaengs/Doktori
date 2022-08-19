/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect, useRef } from 'react'
import { firebaseDB } from '../../Firebase'
import { collection, getDocs, addDoc } from 'firebase/firestore'
import { reverse } from 'dns'

export default function Test() {
	type testType = {
		title: string
		contents: string
	}

	// interface ReviewType {
	// 	bookAuthors: string
	// 	bookIsbn: string
	// 	bookThumbnail: string
	// 	bookTitle: string
	// 	content: string
	// 	date: string
	// 	reviewId: string
	// 	score: number
	// 	writer: string
	// 	writerId: string
	// }

	const [newTitle, setNewTitle] = useState('')
	const [newContent, setNewContent] = useState('')

	const titleRef = useRef<HTMLInputElement>(null)
	const contentRef = useRef<HTMLInputElement>(null)

	const [reviews, setReviews] = useState<testType | any>([])
	const reviewsCollectionRef = collection(firebaseDB, 'test')

	const createReview = async () => {
		// if (titleRef.current != null && contentRef.current != null) {
		// 	setNewTitle(titleRef.current.value)
		// 	setNewContent(contentRef.current.value)
		// }
		await addDoc(reviewsCollectionRef, { title: newTitle, contents: newContent })
	}

	useEffect(() => {
		const getReviews = async () => {
			const data = await getDocs(reviewsCollectionRef)
			// console.log(data)
			const newData = data.docs.map((doc) => ({ ...doc.data() }))
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
		<div>
			<input
				type='text'
				placeholder='리뷰제목'
				ref={titleRef}
				onChange={(event) => {
					setNewTitle(event.target.value)
				}}
			/>
			<input
				type='text'
				placeholder='리뷰작성'
				ref={contentRef}
				onChange={(event) => {
					setNewContent(event.target.value)
				}}
			/>
			<button onClick={createReview}>리뷰 올리기</button>
			{reviews && reviewList}
		</div>
	)
}
