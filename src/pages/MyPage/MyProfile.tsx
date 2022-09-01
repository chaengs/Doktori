import React from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { palette } from 'styles/palette'

export default function MyProfile() {
	const { state } = useLocation()
	const { user } = state as any

	return (
		<UserInfoContainer>
			<UserInfoBox>
				<Title>회원정보</Title>
				<UserName>닉네임 : {user.nickname}</UserName>
				<UserName>이메일 : {user.email}</UserName>
			</UserInfoBox>
		</UserInfoContainer>
	)
}

const Title = styled.h1`
	font-family: Cafe24Ssurround;
	font-size: 30px;
	font-weight: bold;
	text-align: center;
	color: ${palette.pointColor};
	margin: 20px;
`

const UserName = styled.p`
	font-family: Cafe24Ssurround;
	font-size: 20px;
	margin: 30px;
`

const UserInfoContainer = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
`

const UserInfoBox = styled.section`
	width: 500px;
	height: 300px;
	background-color: ${palette.backgroundWhiteColor};
	position: relative;
	top: 20%;
`
