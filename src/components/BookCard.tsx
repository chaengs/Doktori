import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { BookInfoType } from '../types/bookType'

import styled from 'styled-components'
import { theme } from 'styles/theme'
import { NoImageContext } from 'context/NoImageContext'

export default function BookCard({ thumbnail, title, authors, contents, publisher }: BookInfoType) {
	const navigate = useNavigate()

	const [newAuthors, setNewAuthors] = useState<string[] | string>(authors)

	const { onErrorImage } = useContext(NoImageContext)

	const moveToDetailPage = () => {
		navigate('/bookdetail', {
			state: {
				title,
			},
		})
	}

	useEffect(() => {
		if (authors.length > 2) {
			const author = authors.join(',')
			setNewAuthors(author)
		}
		if (authors.length > 3) {
			const author = `${authors.slice(0, 3)}...`
			setNewAuthors(author)
		}
	}, [])

	return (
		<BookCardBox onClick={moveToDetailPage}>
			<img src={thumbnail} alt={title} onError={onErrorImage} />
			<BookInfo>
				<Title>{title}</Title>
				<p>
					{newAuthors} 지음&ensp;|&ensp;{publisher} 펴냄
				</p>
				<Content>
					{contents && contents.length > 100 ? `${contents.substring(0, 100)}...` : contents}
					{!contents && '등록된 줄거리가 없습니다.'}
				</Content>
			</BookInfo>
		</BookCardBox>
	)
}

const BookCardBox = styled.li`
	width: 500px;
	height: 200px;
	background-color: ${theme.color.ivory};
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

	${({ theme }) => theme.media.mobile`
		height:220px;
 	`}
`
const Title = styled.p`
	font-size: 25px;
	font-weight: bold;
	margin-bottom: 7px;

	${({ theme }) => theme.media.mobile`
		font-size:${theme.fontSize.mobileTitle}
 	`}
`

const BookInfo = styled.div`
	white-space: wrap;
	text-align: start;
	margin-left: 15px;
	font-size: 15px;

	p {
		margin-bottom: 7px;
	}

	${({ theme }) => theme.media.mobile`
		font-size:${theme.fontSize.mobileDesc}
 	`}
`

const Content = styled.div`
	height: 20%;
	white-space: wrap;
	text-overflow: ellipsis;
`
