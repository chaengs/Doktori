import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { palette } from 'styles/palette'
import { GiAcorn } from 'react-icons/gi'
import { ReviewCardType } from 'types/review'

export default function ReviewCard({
	bookThumbnail,
	bookTitle,
	writer,
	contents,
	score,
	registerDate,
	writerId,
	reviewId,
}: ReviewCardType) {
	const navigate = useNavigate()

	const moveToReviewDetailPage = () => {
		navigate('/reviewdetail', {
			state: {
				writerId,
				reviewId,
			},
		})
	}

	return (
		<ReviewCardContainer onClick={moveToReviewDetailPage}>
			<img src={bookThumbnail} alt={bookTitle} />
			<WriterInfo>
				<p>{writer}</p>
				<ScoreBox>
					{[1, 2, 3, 4, 5].map((el) => (
						<GiAcorn className={`acorn ${score >= el && 'green'}`} key={el} />
					))}
				</ScoreBox>
				<p>{registerDate}</p>
			</WriterInfo>
			<ContentBox>
				{contents && contents.length > 150 ? `${contents.substring(0, 150)}...` : contents}
			</ContentBox>
		</ReviewCardContainer>
	)
}

const ReviewCardContainer = styled.div`
	width: 880px;
	height: 100px;
	background-color: ${palette.backgroundWhiteColor};
	border: 2px solid ${palette.mainColor};
	border-radius: 7px;
	margin-top: 10px;
	padding-left: 20px;
	padding-right: 20px;
	display: flex;
	align-items: center;
	cursor: pointer;
	img {
		width: auto;
		height: 80%;
		box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.2);
	}
	p {
		font-size: 18px;
	}
`

const WriterInfo = styled.div`
	width: 330px;
	text-align: center;
	margin-left: 10px;
`

const ScoreBox = styled.div`
	margin-top: 5px;
	.acorn {
		font-size: 15px;
		opacity: 0.3;
		cursor: pointer;
	}

	.green {
		color: ${palette.mainColor};
		opacity: 1;
	}
`
const ContentBox = styled.p`
	margin-left: 10px;
`
