import React, { useEffect, useState } from 'react'
import ReviewCard from 'components/ReviewCard'
import { firebaseDB } from 'firebase-config'
import { collection } from 'firebase/firestore'
import useOrderReview from 'hooks/useOrderReview'
import styled from 'styled-components'
import { ReviewType } from 'types/bookType'
import readingImg from 'library/images/reading.svg'

export default function MainPage() {
	const [reviewCheck, setReviewCheck] = useState(false)

	//최근 5개의 리뷰 검색
	const reviewsCollectionRef = collection(firebaseDB, 'bookReviews')
	const reviewList = useOrderReview(reviewsCollectionRef, 'registerDate')
	useEffect(() => {
		if (reviewList) {
			if (reviewList.length > 0) {
				setReviewCheck(true)
			} else {
				setReviewCheck(false)
			}
		}
	}, [reviewList])

	const elementWidth = 550
	const elementLength = reviewList?.length
	const [count, setCount] = useState(0)

	// useEffect(() => {
	// 	const timer = setInterval(() => {
	// 		setCount((prev) => prev + 1)
	// 	}, 2500)
	// 	return () => {
	// 		clearInterval(timer)
	// 	}
	// }, [])

	return (
		<div>
			{/* <h1>새로운 책을 만나보세요.🥰</h1> */}
			{/* <h2>최근 올라온 독후감이에요.</h2> */}
			{/* <img src={readingImg} /> */}
			{/* <Container> */}
			<ReviewCardContainer>
				{reviewCheck &&
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
							publisher={review.publisher}
						/>
					))}
			</ReviewCardContainer>
			{/* </Container> */}
		</div>
	)
}

const ReviewCardContainer = styled.ul`
	/* display: flex; */
	/* flex-wrap: nowrap; */
	/* width: 100vw; */
	/* display: inline; */
	/* justify-content: center; */
	/* align-items: center; */
`

const ViewWindow = styled.div`
	width: 550px;
	/* height: 300px; */
	overflow: hidden;
	display: flex;
	/* justify-content: center; */
	flex-direction: column;
`

const Container = styled.div`
	/* display: flex; */
`

// const Container = styled.div<{ count: number }>`
// 	width: 100%;
// 	display: flex;
// 	//이동효과 추가
// 	transition: transform 1.5s ease-in;
// 	transform: ${(props) => 'translateX(-' + props.count * 120 + 'px)'};
// `
