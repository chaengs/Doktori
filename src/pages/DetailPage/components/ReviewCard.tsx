import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { ReviewCardType } from 'types/review'

import styled from 'styled-components'
import { GiAcorn } from 'react-icons/gi'
import { theme } from 'styles/theme'

import NO_IMAGE from 'library/images/noImage.jpg'
import { NoImageContext } from 'context/NoImageContext'

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

	const { onErrorImage } = useContext(NoImageContext)

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
			<img src={bookThumbnail} alt={bookTitle} onError={onErrorImage} />
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
				{contents && contents.length > 100 ? `${contents.substring(0, 100)}...` : contents}
			</ContentBox>
		</ReviewCardContainer>
	)
}

const ReviewCardContainer = styled.div`
	width: 95%;
	height: 100px;
	font-size: 18px;
	background-color: ${theme.color.ivory};
	border: 2px solid ${theme.color.yellowgreen};
	border-radius: 7px;
	margin-top: 10px;
	padding-left: 20px;
	padding-right: 20px;
	display: flex;
	align-items: center;
	justify-content: flex-start;
	cursor: pointer;
	img {
		width: auto;
		height: 80%;
		box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.2);
	}

	${({ theme }) => theme.media.mobile`
		width:100%;
		font-size: 15px;
		padding:5px;
		img {
			display:none;
		}
 	`}
`

const WriterInfo = styled.div`
	width: auto;
	white-space: nowrap;
	text-align: center;
	margin-left: 10px;
	${({ theme }) => theme.media.mobile`
		margin:0px;
 	`}
`

const ScoreBox = styled.div`
	margin-top: 5px;
	font-size: 15px;
	.acorn {
		opacity: 0.3;
		cursor: pointer;
	}

	.green {
		color: ${theme.color.green};
		opacity: 1;
	}

	${({ theme }) => theme.media.mobile`
		font-size:10px;
 	`}
`
const ContentBox = styled.p`
	margin-left: 10px;
	${({ theme }) => theme.media.mobile`
		margin-left:5px;
 	`}
`
