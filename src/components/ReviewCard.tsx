import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { ReviewCardType } from 'types/review'

import styled from 'styled-components'
import { GiAcorn } from 'react-icons/gi'
import { theme } from 'styles/theme'
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
		<ReviewCardBox onClick={moveToReviewDetailPage}>
			<div>
				<img src={bookThumbnail} alt={bookTitle} onError={onErrorImage} />
			</div>
			<ReviewInfo>
				<Title>{bookTitle.length > 20 ? `${bookTitle.substring(0, 20)}...` : bookTitle}</Title>
				<p>
					{writer}&ensp;|&ensp;{registerDate}
				</p>
				<ScoreBox>
					{[1, 2, 3, 4, 5].map((el) => (
						<GiAcorn className={`acorn ${score >= el && 'green'}`} key={el} />
					))}
				</ScoreBox>
				<Contents>
					{contents && contents.length > 100 ? `${contents.substring(0, 100)}...` : contents}
					{!contents && '등록된 줄거리가 없습니다.'}
				</Contents>
			</ReviewInfo>
		</ReviewCardBox>
	)
}

const ReviewCardBox = styled.div`
	width: 450px;
	height: 200px;
	background-color: ${theme.color.ivory};
	border-radius: 7px;
	box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.2);
	margin-bottom: 10px;
	margin-top: 10px;
	padding: 10px;
	display: flex;
	align-items: center;
	cursor: pointer;

	img {
		width: auto;
		height: 80%;
		box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.2);
	}

	${({ theme }) => theme.media.mobile`
		width: 96vw;
		height: 180px;

		img {
			height: 150px;
		}
 	`}
`

const ReviewInfo = styled.div`
	font-size: ${theme.fontSize.desktopBookDesc};
	text-align: start;
	margin-left: 15px;

	p {
		margin-bottom: 7px;
	}
`

const Title = styled.p`
	font-size: ${theme.fontSize.desktopBookTitle};
	font-weight: bold;
	margin-bottom: 7px;

	${({ theme }) => theme.media.mobile`
		font-size:16px;
 	`}
`
const ScoreBox = styled.div`
	margin-top: 5px;
	color: gray;
	font-size: ${theme.fontSize.desktopBookTitle};
	.acorn {
		opacity: 0.5;
		cursor: pointer;
	}

	.green {
		color: ${theme.color.brown};
		opacity: 1;
	}
`
const Contents = styled.p`
	margin-top: 5px;
`
