import React, { useContext } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { palette } from '../styles/palette'
import { AdminAuthContext } from 'context/AdminAuthContext'
import logo from 'library/images/doctori_logo.png'

export default function Header() {
	const navigate = useNavigate()
	const { isLoggedIn, logout } = useContext(AdminAuthContext)

	const logoutHandler = () => {
		event?.preventDefault()
		logout()
	}

	return (
		<>
			<HeaderContainer>
				<LogoContainer onClick={() => navigate('/main')}>
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

const LinkButton = styled.button`
	font-size: 20px;
	font-weight: bold;
	color: ${palette.fontColor};
	margin-right: 40px;
`
