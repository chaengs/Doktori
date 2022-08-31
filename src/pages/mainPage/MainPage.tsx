import React, { useEffect, useState } from 'react'
import ReviewCard from 'components/ReviewCard'
import { firebaseDB } from 'firebase-config'
import { collection } from 'firebase/firestore'
import useOrderReview from 'hooks/useOrderReview'
import styled from 'styled-components'
import { ReviewType } from 'types/bookType'
import readingImg from 'library/images/reading.svg'
import { palette } from 'styles/palette'

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
			<Introduce>
				<div>
					<p>다람쥐가 도토리를 차곡차곡 모으듯이</p>
					<p>책을 한 권, 한 권 읽으며 독토리를 마음속에 쌓아보세요</p>
				</div>
				<img src={readingImg} />
			</Introduce>
			<Description>최근 올라온 독후감이에요. 다른 독자들의 감상을 살펴보세요.</Description>
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
							writerId={review.writerId}
							reviewId={review.id}
							id={''}
						/>
					))}
			</ReviewCardContainer>
		</div>
	)
}

const Introduce = styled.div`
	width: 100vw;
	height: 300px;
	font-size: 35px;
	font-weight: bolder;
	color: ${palette.pointColor};
	background-color: ${palette.backgroundWhiteColor};
	margin-top: 50px;
	display: flex;
	align-items: center;
	justify-content: center;

	p {
		margin-bottom: 20px;
	}

	img {
		width: 300px;
		height: auto;
		margin-left: 40px;
	}
`

const Description = styled.p`
	font-size: 30px;
	font-weight: bold;
	text-align: center;
	margin: 40px;
`

const ReviewCardContainer = styled.ul`
	width: 100vw;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
`
