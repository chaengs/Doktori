import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'
import { palette } from 'styles/palette'
import backgroundImg from 'library/images/background.jpg'
import logo from 'library/images/doctori_logo.png'

export default function LandingPage() {
	const navigate = useNavigate()

	return (
		<Container>
			<MessageBox>
				<SubMessage>도토리가 다람쥐의 양식이듯, 책은 우리의 양식입니다.</SubMessage>
				<IntroMessage>한 권, 한 권 읽어가며 마음의 양식, 독토리를 쌓아보세요</IntroMessage>
				<StartButton type='button' onClick={() => navigate('/main')}>
					<Logo src={logo} />
					독토리 둘러보기
				</StartButton>
			</MessageBox>
		</Container>
	)
}

const Container = styled.div`
	background-image: url(${backgroundImg});
	width: 100vw;
	height: 100vh;
	/* opacity: 0.8; */
	display: flex;
	align-items: center;
	justify-content: center;
`
const fadeIn = keyframes`
	from { opacity: 0}
	to { opacity: 1}
`

const MessageBox = styled.div`
	animation: ${fadeIn} 3s;
`

const SubMessage = styled.p`
	font-size: 40px;
	color: #fff;
	font-weight: bold;
	margin-bottom: 10px;
`

const IntroMessage = styled.p`
	font-size: 60px;
	color: #fff;
	font-family: 'Cafe24Ssurround';
`
const Logo = styled.img`
	width: 30px;
	height: auto;
	margin-right: 5px;
`

const StartButton = styled.button`
	color: #fff;
	font-size: 25px;
	font-weight: bold;
	background-color: ${palette.pointColor};
	border-radius: 7px;
	padding: 10px;
	margin-top: 10px;
	display: flex;
	align-items: center;
`
