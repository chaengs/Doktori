import React, { useEffect, useState } from 'react'
import { getDocs, Query, query, QueryDocumentSnapshot, where } from 'firebase/firestore'
import { ReviewType } from 'types/bookType'

export default function useSearchDB(collectionRef: Query<unknown>, keyword: string) {
	const [data, setData] = useState<ReviewType | any>()
	const getIsbnData = async () => {
		const dateByQuery = query(collectionRef, where('bookIsbn', '==', keyword))
		const resultData = await getDocs(dateByQuery)
		// console.log(data)
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
