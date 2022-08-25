import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { ReviewType } from '../types/bookType'

import { palette } from 'styles/palette'
import { GiAcorn } from 'react-icons/gi'

export default function ReviewCard({
	bookThumbnail,
	bookTitle,
	bookAuthors,
	writer,
	contents,
	score,
	registerDate,
	finishDate,
	publisher,
}: ReviewType) {
	const navigate = useNavigate()

	const moveToReviewDetailPage = () => {
		navigate('/reviewdetail', {
			state: {
				bookThumbnail,
				bookTitle,
				bookAuthors,
				writer,
				contents,
				score,
				registerDate,
				finishDate,
				publisher,
			},
		})
	}

	return (
		<ReviewCardContainer onClick={moveToReviewDetailPage}>
			<img src={bookThumbnail} alt={bookTitle} />
			<ReviewInfo>
				<div>
					<p>{writer}</p>
					<ScoreBox>
						{[1, 2, 3, 4, 5].map((el) => (
							<GiAcorn className={`acorn ${score >= el && 'green'}`} key={el} />
						))}
					</ScoreBox>
					<p>{registerDate}</p>
				</div>
				<ContentBox>
					{contents && contents.length > 150 ? `${contents.substring(0, 150)}...` : contents}
				</ContentBox>
			</ReviewInfo>
		</ReviewCardContainer>
	)
}

const ReviewCardContainer = styled.li`
	width: 70%;
	height: 10%;
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
`

const ReviewInfo = styled.div`
	margin-left: 20px;
	display: flex;
	align-items: center;
	p {
		font-size: 18px;
	}
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
	font-size: 18px;
	margin-left: 20px;
`
