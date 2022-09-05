import React, { useEffect, useState } from 'react'

import { firebaseDB } from 'firebase-config'
import { collection } from 'firebase/firestore'

import ReviewCard from 'components/ReviewCard'
import useOrderReview from 'hooks/useOrderReview'

import { ReviewCardType } from 'types/review'

import styled from 'styled-components'
import { theme } from 'styles/theme'

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
			<MessageBox>
				<Message>최근 올라온 독후감이에요.</Message>
				<Message>다른 독자들은 어떤 책을 읽었을까요?</Message>
			</MessageBox>
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

const MessageBox = styled.div`
	margin-top: 20px;
	margin-bottom: 20px;
`

const Message = styled.p`
	font-size: ${theme.fontSize.desktopTitle};
	font-weight: bold;
	text-align: center;
	margin: 10px;

	${({ theme }) => theme.media.mobile`
		font-size:${theme.fontSize.mobileDesc};
 	`}
`

const ReviewCardBox = styled.ul`
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	grid-column-start: 1;
	row-gap: 10px;
	column-gap: 10px;

	${({ theme }) => theme.media.mobile`
	grid-template-columns: 1fr;
 	`}
`
