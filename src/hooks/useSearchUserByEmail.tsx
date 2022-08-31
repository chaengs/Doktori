import React, { useEffect, useState } from 'react'
import {
	collection,
	DocumentData,
	getDocs,
	query,
	QueryDocumentSnapshot,
	where,
} from 'firebase/firestore'
import { firebaseDB } from 'firebase-config'

export default function useSearchUserByEmail(keyword: string | null) {
	const [data, setData] = useState<DocumentData | any>()
	const usersCollectionRef = collection(firebaseDB, 'users')

	const getUserData = async () => {
		const dateByQuery = query(usersCollectionRef, where('email', '==', keyword))
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
	return data
}
