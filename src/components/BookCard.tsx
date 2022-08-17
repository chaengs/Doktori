import React from 'react'
import DetailPage from '../pages/DetailPage/DetailPage'

type BookInfoType = {
	thumbnail: string
	title: string
	authors: string
	contents: string
	datetime: string
	publisher: string
}

export default function BookCard({
	thumbnail,
	title,
	authors,
	contents,
	datetime,
	publisher,
}: BookInfoType) {
	return (
		<div>
			<img src={thumbnail} />
			<p>{title}</p>
		</div>
	)
}
