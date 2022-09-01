import React, { useEffect, useState } from 'react'
import {
	collection,
	DocumentData,
	getDocs,
	orderBy,
	query,
	QueryDocumentSnapshot,
	where,
} from 'firebase/firestore'
import { firebaseDB } from 'firebase-config'

export default function useSearchReviewByTitle(keyword: string) {
	const [data, setData] = useState<DocumentData | any>()
	const reviewsCollectionRef = collection(firebaseDB, 'bookReviews')

	const getIsbnData = async () => {
		const dataByQuery = query(reviewsCollectionRef, where('writerId', '==', keyword))
		const resultData = await getDocs(dataByQuery)
		const newData = resultData.docs.map((doc) => ({
			...(doc.data() as QueryDocumentSnapshot<unknown>),
			id: doc.id,
		}))
		setData(newData)
	}
	useEffect(() => {
		getIsbnData()
	}, [])
	return data
}
