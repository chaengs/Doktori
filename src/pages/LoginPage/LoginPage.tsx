import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AdminAuthContext } from 'context/AdminAuthContext'
import styled from 'styled-components'
import { palette } from 'styles/palette'
import ButtonStyle from 'styles/ButtonStyle'
import FormStyle from 'styles/FormStyle'
import InputStyle from 'styles/InputStyle'

export default function LoginPage() {
	const navigate = useNavigate()
	const { login } = useContext(AdminAuthContext)

	const [loginEmail, setLoginEmail] = useState('')
	const [loginPassword, setLoginPassword] = useState('')

	const loginHandler = async () => {
		event?.preventDefault()
		await login(loginEmail, loginPassword)
		alert('로그인 되었습니다.')
		navigate('/main', { replace: true })
	}
	return (
		<FormStyle onSubmit={loginHandler}>
			<Title>로그인</Title>
			<InputStyle
				placeholder='Email...'
				onChange={(event) => {
					setLoginEmail(event.target.value)
				}}
			/>
			<InputStyle
				placeholder='Password...'
				onChange={(event) => {
					setLoginPassword(event.target.value)
				}}
			/>
			<ButtonStyle type='submit'> Login</ButtonStyle>
		</FormStyle>
	)
}

const Title = styled.h1`
	color: ${palette.backgroundColor};
	font-size: 28px;
	font-family: Cafe24Ssurround;
	margin-top: 20px;
`
