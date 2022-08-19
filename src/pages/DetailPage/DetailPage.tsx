import React from 'react'
import { useLocation } from 'react-router-dom'
import { BookInfoType } from '../../types/bookType'
import { firebaseDB } from '../../Firebase'
import { collection } from 'firebase/firestore'
export default function DetailPage() {
	const { state } = useLocation()
	const { thumbnail, title, authors, contents, datetime, publisher } = state as BookInfoType

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
