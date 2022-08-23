import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { firebaseAuth } from '../../Firebase'

export default function RegisterPage() {
	const [registerEmail, setRegisterEmail] = useState('')
	const [registerPassword, setRegisterPassword] = useState('')

	const register = async () => {
		try {
			const user = await createUserWithEmailAndPassword(
				firebaseAuth,
				registerEmail,
				registerPassword,
			)
			console.log(user)
		} catch (error) {
			if (error instanceof Error) {
				console.log(error.message)
			}
		}
	}

	return (
		<div>
			<h3> 회원가입 </h3>
			<input
				placeholder='Email...'
				onChange={(event) => {
					setRegisterEmail(event.target.value)
				}}
			/>
			<input
				placeholder='Password...'
				onChange={(event) => {
					setRegisterPassword(event.target.value)
				}}
			/>

			<button onClick={register}> Create User</button>
		</div>
	)
}
