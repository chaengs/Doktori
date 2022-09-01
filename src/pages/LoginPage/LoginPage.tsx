import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { AdminAuthContext } from 'context/AdminAuthContext'

import { checkEmailRegExp, checkPasswordRegExp } from 'util/checkRegExp'

import styled from 'styled-components'
import { palette } from 'styles/palette'
import ButtonStyle from 'styles/ButtonStyle'
import FormStyle from 'styles/FormStyle'
import InputStyle from 'styles/InputStyle'
import { AiFillEyeInvisible as CloseEyes, AiFillEye as OpenEyes } from 'react-icons/ai'

export default function LoginPage() {
	const navigate = useNavigate()

	const [showPassword, setShowPassword] = useState<boolean>(false)

	const { login } = useContext(AdminAuthContext)

	const [loginEmail, setLoginEmail] = useState('')
	const [loginPassword, setLoginPassword] = useState('')

	// 이메일, 비밀번호 유효성 검사 통과 여부
	const [validEmail, setValidEmail] = useState<boolean>(false)
	const [validPassword, setValidPassword] = useState<boolean>(false)

	const [buttonActive, setButtonActive] = useState<boolean>(true)

	const loginHandler = async () => {
		event?.preventDefault()
		await login(loginEmail, loginPassword)
		if (localStorage.getItem('localLoggedIn')) {
			alert('로그인 되었습니다.')
			navigate('/')
		}
	}

	const checkEmail = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const email = event.target.value
			if (checkEmailRegExp(email)) {
				setLoginEmail(email)
				setValidEmail(true)
			} else {
				setValidEmail(false)
			}
		},
		[loginEmail],
	)

	const checkPassword = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const password = event.target.value
			if (checkPasswordRegExp(password)) {
				setLoginPassword(password)
				setValidPassword(true)
			} else {
				setValidPassword(false)
			}
		},
		[loginPassword],
	)

	//유효성 검사에 따른 버튼 활성화
	useEffect(() => {
		validEmail && validPassword ? setButtonActive(false) : setButtonActive(true)
	}, [loginEmail, loginPassword])

	//비밀번호 보임, 숨김
	const showPasswordHandler = () => {
		event?.preventDefault()
		setShowPassword(!showPassword)
	}

	return (
		<FormStyle onSubmit={loginHandler}>
			<Title>로그인</Title>
			<StyledInput
				placeholder='이메일을 입력하세요.'
				onChange={checkEmail}
				className={validEmail ? 'valid' : 'invalid'}
			/>
			<MsgBox>{!validEmail && <WarningMsg>이메일 형식에 맞게 작성해주세요.</WarningMsg>}</MsgBox>
			<StyledInput
				placeholder='비밀번호를 입력하세요.'
				onChange={checkPassword}
				className={validPassword ? 'valid' : 'invalid'}
				type={showPassword ? 'text' : 'password'}
			/>
			<MsgBox>
				{!validPassword && (
					<WarningMsg>문자, 숫자, 특수문자를 포함하여 8자 이상 작성해주세요.</WarningMsg>
				)}
			</MsgBox>
			<EyeButton onClick={showPasswordHandler}>
				{showPassword ? <OpenEyes /> : <CloseEyes />}
			</EyeButton>
			<SubmitButton
				type='submit'
				disabled={buttonActive}
				className={buttonActive ? 'buttonOff' : 'buttonOn'}
			>
				로그인 하기
			</SubmitButton>
		</FormStyle>
	)
}

const Title = styled.h1`
	color: ${palette.backgroundColor};
	font-size: 28px;
	font-family: Cafe24Ssurround;
	margin-top: 20px;
`
const StyledInput = styled(InputStyle)`
	&.valid {
		border-color: ${palette.pointColor};
	}
	&.invalid {
		border-color: ${palette.warningColor};
	}
`
const MsgBox = styled.p`
	height: 20px;
`

const WarningMsg = styled.span`
	font-size: 15px;
	font-weight: bold;
	color: ${palette.warningColor};
`

const EyeButton = styled.button`
	color: ${palette.pointColor};
	font-size: 25px;
	position: absolute;
	right: 10%;
	bottom: 38%;
`

const SubmitButton = styled(ButtonStyle)`
	&.buttonOff {
		opacity: 0.3;
	}
	&.buttonOn {
		opacity: 1;
	}
`
