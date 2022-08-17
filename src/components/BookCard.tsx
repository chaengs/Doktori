import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { BookInfoType } from '../types/bookType'

export default function BookCard({
	thumbnail,
	title,
	authors,
	contents,
	datetime,
	publisher,
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
			},
		})
	}

	return (
		<BookCardContainer onClick={moveToDetailPage}>
			<img src={thumbnail} alt={title} />
			<p>{title}</p>
		</BookCardContainer>
	)
}

const BookCardContainer = styled.li`
	cursor: pointer;
`
