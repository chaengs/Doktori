import { DocumentData } from 'firebase/firestore'
import useSearchUserByEmail from 'hooks/useSearchUserByEmail'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import ButtonStyle from 'styles/ButtonStyle'
import { palette } from 'styles/palette'
import { userInfoType } from 'types/userInfoType'

export default function MyPage() {
	const navigate = useNavigate()

	const [user, setUser] = useState<userInfoType | any>()

	const userEmail = localStorage.getItem('userEmail')
	const userArray = useSearchUserByEmail(userEmail)
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
	color: ${palette.pointColor};
	margin: 20px;
`

const ButtonBox = styled.div`
	text-align: center;
	button {
		margin: 20px;
	}
`
