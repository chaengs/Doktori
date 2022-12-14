import React, { useEffect, useState } from 'react'
import {
	CollectionReference,
	DocumentData,
	getDocs,
	limit,
	orderBy,
	query,
	QueryDocumentSnapshot,
} from 'firebase/firestore'

export default function useOrderReview(
	collectionRef: CollectionReference<DocumentData>,
	keyword: string,
) {
	const [data, setData] = useState<DocumentData>()
	const setDataOrder = async () => {
		const dataByQuery = query(collectionRef, orderBy(keyword, 'desc'), limit(12))
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
