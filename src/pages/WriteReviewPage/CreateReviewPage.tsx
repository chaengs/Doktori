import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { firebaseDB } from 'firebase-config'
import { collection } from 'firebase/firestore'

import ReviewEditor from './components/ReviewEditor'
import useSearchDB from 'hooks/useSearchDB'

import { userType } from 'types/userType'

import styled from 'styled-components'

export default function CreateReviewPage() {
	const [user, setUser] = useState<userType>()

	//BookDetailPage 컴포넌트에서 prop 받아옴
	const { state } = useLocation()

	//유저 정보 받아오기
	const writerEmail = localStorage.getItem('userEmail')
	const usersCollectionRef = collection(firebaseDB, 'users')
	const userArray = useSearchDB(usersCollectionRef, 'email', writerEmail)

	useEffect(() => {
		if (userArray) {
			const userInfo = userArray[0]
			setUser(userInfo)
		}
	}, [state, userArray])

	return (
		<EditorContainer>
			<ReviewEditor isEdit={false} user={user} bookData={state} />
		</EditorContainer>
	)
}

const EditorContainer = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
`
