import React from 'react'
import { GiAcorn } from 'react-icons/gi'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { palette } from 'styles/palette'
import { ReviewType } from 'types/bookType'

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
		<ReviewCardBox onClick={moveToReviewDetailPage}>
			<div>
				<img src={bookThumbnail} alt={bookTitle} />
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
	width: 500px;
	height: 200px;
	background-color: ${palette.backgroundWhiteColor};
	border-radius: 7px;
	box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.2);
	margin: 10px;
	padding: 10px;
	display: flex;
	align-items: center;
	/* overflow: hidden; */
	white-space: wrap;
	cursor: pointer;

	img {
		width: auto;
		height: 80%;
		box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.2);
	}
`

const ReviewInfo = styled.div`
	font-size: 15px;
	white-space: wrap;
	text-align: start;
	margin-left: 15px;

	p {
		margin-bottom: 7px;
	}
`

const Title = styled.p`
	font-size: 18px;
	font-weight: bold;
	margin-bottom: 7px;
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
const Contents = styled.p`
	margin-top: 5px;
`
