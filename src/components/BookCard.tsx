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
		navigate('/bookdetail', {
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
		<BookCardBox onClick={moveToDetailPage}>
			<img src={thumbnail} alt={title} />
			<BookInfo>
				<Title>{title}</Title>
				<p>
					{authors.length > 2 ? `${authors.join(', ')}` : authors} 지음&ensp;|&ensp;{publisher} 펴냄
				</p>
				<div>
					{contents && contents.length > 150 ? `${contents.substring(0, 150)}...` : contents}
					{!contents && '등록된 줄거리가 없습니다.'}
				</div>
			</BookInfo>
		</BookCardBox>
	)
}

const BookCardBox = styled.li`
	width: 500px;
	height: 200px;
	background-color: ${palette.backgroundWhiteColor};
	border-radius: 7px;
	box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.2);
	margin: 10px;
	padding: 10px;
	display: flex;
	align-items: center;
	cursor: pointer;

	img {
		width: auto;
		height: 85%;
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
