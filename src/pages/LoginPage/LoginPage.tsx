import { AdminAuthContext } from 'context/AdminAuthContext'
import React, { useContext, useState } from 'react'

export default function LoginPage() {
	const { login } = useContext(AdminAuthContext)

	const [loginEmail, setLoginEmail] = useState('')
	const [loginPassword, setLoginPassword] = useState('')

	const loginHandler = () => {
		login(loginEmail, loginPassword)
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
