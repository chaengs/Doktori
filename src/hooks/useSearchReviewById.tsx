import React, { useEffect, useState } from 'react'
import { doc, DocumentData, getDoc } from 'firebase/firestore'
import { firebaseDB } from 'firebase-config'

export default function useSearchReviewById(keyword: string) {
	const [data, setData] = useState<DocumentData>()
	const reviewsCollectionRef = doc(firebaseDB, 'bookReviews', keyword)

	const getReviewDataById = async () => {
		const resultData = await getDoc(reviewsCollectionRef)
		if (resultData.exists()) {
			const newData = resultData.data()
			setData(newData)
		}
	}
	useEffect(() => {
		getReviewDataById()
	}, [])
	return data
}
