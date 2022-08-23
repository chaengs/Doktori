import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { palette } from 'styles/palette'

import { BookInfoType } from '../types/bookType'

export default function BookCard({
	thumbnail,
	title,
	authors,
	contents,
	datetime,
	publisher,
	isbn,
}: BookInfoType) {
	const navigate = useNavigate()

	const moveToDetailPage = () => {
		navigate('/detail', {
			state: {
				thumbnail,
				title,
				authors,
				contents,
				datetime,
				publisher,
				isbn,
			},
		})
	}

	return (
		<BookCardContainer onClick={moveToDetailPage}>
			<BookCardBox>
				<img src={thumbnail} alt={title} />
				<BookInfo>
					<Title>{title}</Title>
					<p>{authors.length > 2 ? `${authors.join(', ')}` : authors}</p>
					<p>{publisher} 펴냄</p>
					<div>
						{contents && contents.length > 150 ? `${contents.substring(0, 150)}...` : contents}
						{!contents && '등록된 줄거리가 없습니다.'}
					</div>
				</BookInfo>
			</BookCardBox>
		</BookCardContainer>
	)
}

const BookCardContainer = styled.li`
	width: 500px;
	background-color: ${palette.backgroundWhiteColor};
	border-radius: 7px;
	box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.2);

	margin: 10px;
	cursor: pointer;
`

const BookCardBox = styled.div`
	display: flex;
	/* flex-direction: column; */
	align-items: center;
	margin: 15px;

	img {
		width: 150px;
		height: auto;
		box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.2);
	}
`

const BookInfo = styled.div`
	font-size: 15px;
	white-space: wrap;
	text-align: start;
	margin-left: 15px;

	p {
		margin-bottom: 7px;
	}
`

const Title = styled.p`
	font-size: 25px;
	font-weight: bold;
	margin-bottom: 7px;
`
