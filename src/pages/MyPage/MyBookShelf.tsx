import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import ReviewCard from 'components/ReviewCard'
import useSearchReviewByUserId from 'hooks/useSearchReviewByUserId'
import { ReviewCardType } from 'types/review'
import styled from 'styled-components'
import { palette } from 'styles/palette'

export default function MyBookShelf() {
	const [reviewCheck, setReviewCheck] = useState<boolean>(false)

	const { state } = useLocation()
	const { user } = state as any
	const reviewList = useSearchReviewByUserId(user.uid)

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
	color: ${palette.pointColor};
	margin: 20px;
`

const ReviewCardContainer = styled.section`
	width: 100vw;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
`
