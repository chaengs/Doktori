import React, { useState } from 'react'
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth'
import { firebaseAuth } from '../../Firebase'
import { userInfoType } from '../../types/userInfoType'

export default function LoginPage() {
	const [loginEmail, setLoginEmail] = useState('')
	const [loginPassword, setLoginPassword] = useState('')

	const login = async () => {
		try {
			const { user } = await signInWithEmailAndPassword(firebaseAuth, loginEmail, loginPassword)
			console.log(user)
			const { email, uid } = user as userInfoType
			console.log('로그인 성공')
			localStorage.setItem('email', email)
			localStorage.setItem('uid', uid)
		} catch (error) {
			if (error instanceof Error) {
				console.log(error.message)
			}
		}
	}

	return (
		<div>
			<h3> Login </h3>
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

			<button onClick={login}> Login</button>
		</div>
	)
}
