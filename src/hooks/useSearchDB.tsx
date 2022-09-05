import React, { useEffect, useState } from 'react'
import {
	CollectionReference,
	DocumentData,
	getDocs,
	query,
	QueryDocumentSnapshot,
	where,
} from 'firebase/firestore'

export default function useSearchDB(
	collectionRef: CollectionReference<DocumentData>,
	keyword: string,
	value: string | null,
) {
	const [data, setData] = useState<DocumentData>()

	const getDataInDB = async () => {
		const dataByQuery = query(collectionRef, where(keyword, '==', value))
		const resultData = await getDocs(dataByQuery)
		const newData = resultData.docs.map((doc) => ({
			...(doc.data() as QueryDocumentSnapshot<unknown>),
			id: doc.id,
		}))
		setData(newData)
	}
	useEffect(() => {
		getDataInDB
	}, [])
	return data
}
