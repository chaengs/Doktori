import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { collection } from 'firebase/firestore'
import { firebaseDB } from 'firebase-config'

import ReviewCard from 'components/ReviewCard'
import useSearchDB from 'hooks/useSearchDB'

import { ReviewCardType } from 'types/review'

import styled from 'styled-components'
import { theme } from 'styles/theme'

export default function MyBookShelf() {
	const [reviewCheck, setReviewCheck] = useState<boolean>(false)

	const { state } = useLocation()
	const { user } = state as any

	//useSearchDB 커스텀 훅으로 한 유저의 모든 리뷰 쿼리 검색
	const reviewsCollectionRef = collection(firebaseDB, 'bookReviews')
	const reviewList = useSearchDB(reviewsCollectionRef, 'writerId', user.uid)

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
			<Title>{user.nickname}님의 책장</Title>
			<ReviewCardContainer>
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
			</ReviewCardContainer>
		</>
	)
}

const Title = styled.h1`
	font-family: Cafe24Ssurround;
	font-size: 30px;
	font-weight: bold;
	text-align: center;
	color: ${theme.color.green};
	margin: 20px;
`

const ReviewCardContainer = styled.section`
	width: 100vw;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
`
