import React, { useEffect, useState } from 'react'
import { getDocs, Query, query, QueryDocumentSnapshot, where } from 'firebase/firestore'
import { ReviewType } from 'types/bookType'

export default function useSearchDB(collectionRef: Query<unknown>, keyword: string) {
	const [data, setData] = useState<ReviewType | any>()
	const getIsbnData = async () => {
		try {
			const dateByQuery = query(collectionRef, where('bookIsbn', '==', keyword))
			const resultData = await getDocs(dateByQuery)
			const newData = resultData.docs.map((doc) => ({
				...(doc.data() as QueryDocumentSnapshot<unknown>),
				id: doc.id,
			}))
			setData(newData)
		} catch {
			console.log('일치하는 리뷰가 없습니다.')
		}
	}
	useEffect(() => {
		getIsbnData()
	}, [])
	return data
}
