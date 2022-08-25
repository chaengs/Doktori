import React, { useEffect, useState } from 'react'
import { getDocs, Query, query, QueryDocumentSnapshot, where } from 'firebase/firestore'
import { ReviewType } from 'types/bookType'

export default function useSearchUser(collectionRef: Query<unknown>, keyword: string | null) {
	const [data, setData] = useState<ReviewType | any>()
	const getUserData = async () => {
		const dateByQuery = query(collectionRef, where('email', '==', keyword))
		const resultData = await getDocs(dateByQuery)
		const newData = resultData.docs.map((doc) => ({
			...(doc.data() as QueryDocumentSnapshot<unknown>),
			id: doc.id,
		}))
		setData(newData)
	}
	useEffect(() => {
		getUserData()
	}, [])
	return { data }
}
