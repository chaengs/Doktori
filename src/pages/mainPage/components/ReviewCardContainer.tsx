import React, { useEffect, useState } from 'react'

import { firebaseDB } from 'firebase-config'
import { collection } from 'firebase/firestore'

import ReviewCard from 'components/ReviewCard'
import useOrderReview from 'hooks/useOrderReview'

import { ReviewCardType } from 'types/review'

import styled from 'styled-components'

export default function ReviewCardContainer() {
	const [reviewCheck, setReviewCheck] = useState<boolean>(false)

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
		<>
			<Description>최근 올라온 독후감이에요. 다른 독자들은 어떤 책을 읽었을까요?</Description>
			<ReviewCardBox>
				{reviewCheck &&
					reviewList?.map((review: ReviewCardType) => (
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
					))}
			</ReviewCardBox>
		</>
	)
}

const Description = styled.p`
	font-size: 30px;
	font-weight: bold;
	text-align: center;
	margin: 40px;
`

const ReviewCardBox = styled.ul`
	width: 100vw;
	display: flex;
	justify-content: space-evenly;
	flex-wrap: wrap;
`
