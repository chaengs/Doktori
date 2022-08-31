import React, { useEffect, useState } from 'react'
import {
	collection,
	doc,
	getDoc,
	Query,
	query,
	QueryDocumentSnapshot,
	where,
} from 'firebase/firestore'
import { ReviewType } from 'types/bookType'
import { firebaseDB } from 'firebase-config'

export default function useSearchReviewById(keyword: string) {
	const [data, setData] = useState<ReviewType | any>()
	const reviewsCollectionRef = doc(firebaseDB, 'bookReviews', keyword)

	const getIsbnData = async () => {
		// const dataByQuery = query(reviewsCollectionRef, where('id', '==', keyword))
		const resultData = await getDoc(reviewsCollectionRef)
		// const newData = resultData.docs.map((doc) => ({
		// 	...(doc.data() as QueryDocumentSnapshot<unknown>),
		// 	id: doc.id,
		// }))
		if (resultData.exists()) {
			const newData = resultData.data()
			setData(newData)
		}
	}
	useEffect(() => {
		getIsbnData()
	}, [])
	return data
}
