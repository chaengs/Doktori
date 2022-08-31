import React, { useEffect, useState } from 'react'
import {
	DocumentData,
	getDocs,
	limit,
	orderBy,
	Query,
	query,
	QueryDocumentSnapshot,
} from 'firebase/firestore'

export default function useOrderReview(collectionRef: Query<unknown>, keyword: string) {
	const [data, setData] = useState<DocumentData>()
	const setDataOrder = async () => {
		const dataByQuery = query(collectionRef, orderBy(keyword, 'desc'), limit(9))
		const resultData = await getDocs(dataByQuery)
		if (resultData.docs.length > 0) {
			const newData = resultData.docs.map((doc) => ({
				...(doc.data() as QueryDocumentSnapshot<unknown>),
				id: doc.id,
			}))
			setData(newData)
		}
	}
	useEffect(() => {
		setDataOrder()
	}, [])
	return data
}
