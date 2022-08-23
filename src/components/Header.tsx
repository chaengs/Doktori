import React from 'react'
import { signOut } from 'firebase/auth'
import { firebaseAuth } from '../Firebase'
import { Outlet, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { palette } from '../styles/palette'
import logo from 'library/images/doctori_logo.png'

export default function Header() {
	const navigate = useNavigate()
	const logout = async () => {
		localStorage.removeItem('email')
		localStorage.removeItem('uid')
		await signOut(firebaseAuth)
	}
	const loginCheck = firebaseAuth.currentUser?.email

	return (
		<>
			<HeaderContainer>
				<LogoContainer onClick={() => navigate('/main')}>
					<LogoImg src={logo} />
					<TitleStyle>독토리</TitleStyle>
				</LogoContainer>
				<ButtonContainer>
					<BookButton onClick={() => navigate('/search')}>책 검색</BookButton>
					{loginCheck ? (
						<LogInButton onClick={logout}>로그아웃</LogInButton>
					) : (
						<LogInButton onClick={() => navigate('/login')}>로그인</LogInButton>
					)}
				</ButtonContainer>
			</HeaderContainer>
			<Outlet />
		</>
	)
}

const HeaderContainer = styled.header`
	width: 100vw;
	height: 70px;
	/* border-bottom: solid 3px #606c38; */
	background-color: #606c38;
	display: flex;
	justify-content: space-between;
`
const LogoContainer = styled.div`
	margin-left: 40px;
	display: flex;
	align-items: center;
	cursor: pointer;
`

const LogoImg = styled.img`
	width: 55px;
	height: 55px;
	margin-bottom: 5px;
`

const TitleStyle = styled.p`
	color: ${palette.fontColor};
	font-family: Cafe24Ssurround;
	font-size: 26px;
`
const ButtonContainer = styled.div`
	display: flex;
	align-items: center;
`

const BookButton = styled.button`
	font-size: 20px;
	font-weight: bold;
	color: ${palette.fontColor};
	margin-right: 40px;
`

const LogInButton = styled.button`
	font-size: 20px;
	font-weight: bold;
	color: ${palette.fontColor};
	margin-right: 40px;
`
