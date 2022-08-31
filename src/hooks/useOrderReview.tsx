import React, { useEffect, useState } from 'react'
import { getDocs, limit, orderBy, Query, query, QueryDocumentSnapshot } from 'firebase/firestore'
import { ReviewType } from 'types/bookType'

export default function useOrderReview(collectionRef: Query<unknown>, keyword: string) {
	const [data, setData] = useState<ReviewType | any>()
	const setDataOrder = async () => {
		const dataByQuery = query(collectionRef, orderBy(keyword), limit(10))
		const resultData = await getDocs(dataByQuery)
		const newData = resultData.docs.map((doc) => ({
			...(doc.data() as QueryDocumentSnapshot<unknown>),
			id: doc.id,
		}))
		setData(newData)
	}
	useEffect(() => {
		setDataOrder()
	}, [])
	return data
}
