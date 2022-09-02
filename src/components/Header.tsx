import React, { useContext } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import { AdminAuthContext } from 'context/AdminAuthContext'

import styled from 'styled-components'
import logo from 'library/images/doctori_logo.png'
import { theme } from 'styles/theme'

export default function Header() {
	const navigate = useNavigate()
	const { isLoggedIn, logout } = useContext(AdminAuthContext)

	const logoutHandler = () => {
		event?.preventDefault()
		logout()
		navigate('/')
	}

	return (
		<>
			<HeaderContainer>
				<LogoContainer onClick={() => navigate('/')}>
					<LogoImg src={logo} />
					<TitleStyle>독토리</TitleStyle>
				</LogoContainer>
				<ButtonContainer>
					<LinkButton onClick={() => navigate('/search')}>책 검색</LinkButton>
					{isLoggedIn ? (
						<LinkButton onClick={logoutHandler}>로그아웃</LinkButton>
					) : (
						<LinkButton onClick={() => navigate('/login')}>로그인</LinkButton>
					)}
					{isLoggedIn && <LinkButton onClick={() => navigate('/mypage')}>마이페이지</LinkButton>}
					{!isLoggedIn && <LinkButton onClick={() => navigate('/register')}>회원가입</LinkButton>}
				</ButtonContainer>
			</HeaderContainer>
			<Outlet />
		</>
	)
}

const HeaderContainer = styled.header`
	width: 100vw;
	height: 70px;
	background-color: ${theme.color.yellowgreen};
	display: flex;
	justify-content: space-between;
`
const LogoContainer = styled.div`
	margin-left: 40px;
	display: flex;
	align-items: center;
	cursor: pointer;
	${({ theme }) => theme.media.mobile`
		margin-left:10px;
 	`}
`

const LogoImg = styled.img`
	width: 35px;
	height: auto;
	margin: 5px;
	${({ theme }) => theme.media.mobile`
		width: 30px;
 	`}
`

const TitleStyle = styled.p`
	color: ${theme.color.green};
	font-family: Cafe24Ssurround;
	font-size: 26px;
`
const ButtonContainer = styled.div`
	display: flex;
	align-items: center;
`

const LinkButton = styled.button`
	font-size: 20px;
	font-weight: bold;
	color: ${theme.color.green};
	margin-right: 40px;

	${({ theme }) => theme.media.mobile`
		font-size:17px;
		margin-right:10px;
 	`}
`
