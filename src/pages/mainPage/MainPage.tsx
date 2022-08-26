import ReviewCard from 'components/ReviewCard'
import { reverse } from 'dns'
import { firebaseDB } from 'firebase-config'
import { collection } from 'firebase/firestore'
import useOrderReview from 'hooks/useOrderReview'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { ReviewType } from 'types/bookType'

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

	return (
		<div>
			<h1>새로운 책을 만나보세요.🥰</h1>
			<h2>최근 올라온 독후감이에요.</h2>
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
		</div>
	)
}

const ReviewCardContainer = styled.ul`
	display: flex;
`
