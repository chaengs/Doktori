import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { firebaseDB } from 'firebase-config'
import { collection } from 'firebase/firestore'

import useSearchDB from 'hooks/useSearchDB'

import { userType } from 'types/userType'

import styled from 'styled-components'
import ButtonStyle from 'styles/ButtonStyle'
import { theme } from 'styles/theme'

export default function MyPage() {
	const navigate = useNavigate()

	const [user, setUser] = useState<userType | any>()

	//useSearchDB 커스텀 훅으로 유저 쿼리 검색
	const userEmail = localStorage.getItem('userEmail')
	const usersCollectionRef = collection(firebaseDB, 'users')

	const userArray = useSearchDB(usersCollectionRef, 'email', userEmail)
	useEffect(() => {
		if (userArray) {
			const userInfo = userArray[0]
			setUser(userInfo)
		}
	}, [userArray])

	const moveToBookShelf = () => {
		navigate('/mybookshelf', {
			state: {
				user: user,
			},
		})
	}

	const moveToProfile = () => {
		navigate('/myprofile', {
			state: {
				user: user,
			},
		})
	}

	return (
		<ContentContainer>
			<Title>{user?.nickname}님 반가워요!</Title>
			<ButtonBox>
				<ButtonStyle onClick={moveToProfile}>회원정보</ButtonStyle>
				<ButtonStyle onClick={moveToBookShelf}>내 책장</ButtonStyle>
			</ButtonBox>
		</ContentContainer>
	)
}

const ContentContainer = styled.section`
	position: relative;
	top: 30%;
`

const Title = styled.h1`
	font-family: Cafe24Ssurround;
	font-size: 30px;
	font-weight: bold;
	text-align: center;
	color: ${theme.color.green};
	margin: 20px;
`

const ButtonBox = styled.div`
	text-align: center;
	button {
		margin: 20px;
	}
`
