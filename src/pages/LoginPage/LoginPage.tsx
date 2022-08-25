import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AdminAuthContext } from 'context/AdminAuthContext'

export default function LoginPage() {
	const navigate = useNavigate()
	const { login } = useContext(AdminAuthContext)

	const [loginEmail, setLoginEmail] = useState('')
	const [loginPassword, setLoginPassword] = useState('')

	const loginHandler = async () => {
		event?.preventDefault()
		await login(loginEmail, loginPassword)
		alert('로그인 되었습니다.')
		navigate('/main')
	}
	return (
		<div>
			<h3> Login </h3>
			<form onSubmit={loginHandler}>
				<input
					placeholder='Email...'
					onChange={(event) => {
						setLoginEmail(event.target.value)
					}}
				/>
				<input
					placeholder='Password...'
					onChange={(event) => {
						setLoginPassword(event.target.value)
					}}
				/>
				<button type='submit'> Login</button>
			</form>
		</div>
	)
}
