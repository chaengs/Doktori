import React from 'react'
import { useLocation } from 'react-router-dom'
import { BookInfoType } from '../../types/bookType'
export default function DetailPage() {
	const location = useLocation()

	const state = location.state as BookInfoType
	const title = state.title
	const thumbnail = state.thumbnail
	const authors = state.authors
	const contents = state.contents
	const datetime = state.datetime
	const publisher = state.publisher

	return (
		<section>
			<h1>{title}</h1>
			<img src={thumbnail} alt={title} />
			<p>{authors}</p>
			<p>{contents}</p>
			<p>{datetime}</p>
			<p>{publisher}</p>
		</section>
	)
}
