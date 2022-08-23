import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { BookInfoType } from '../../types/bookType'

export default function DetailPage() {
	const { state } = useLocation()
	const { thumbnail, title, authors, contents, datetime, publisher, isbn } = state as BookInfoType

	const navigate = useNavigate()

	const moveToReviewEditor = () => {
		navigate('/reviewedit', {
			state: {
				bookThumbnail: thumbnail,
				bookTitle: title,
				bookAuthors: authors,
				bookIsbn: isbn,
			},
		})
	}
	return (
		<section>
			<h1>{title}</h1>
			<img src={thumbnail} alt={title} />
			<p>{authors}</p>
			<p>{contents}</p>
			<p>{datetime}</p>
			<p>{publisher}</p>
			<button onClick={moveToReviewEditor}>리뷰 작성하기</button>
		</section>
	)
}
