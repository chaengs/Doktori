import React, { useState } from 'react'
import { firebaseAuth, firebaseDB } from '../../firebase-config'
import { collection } from 'firebase/firestore'
import { createUserWithEmailAndPassword } from 'firebase/auth'

export default function RegisterPage() {
	const [registerEmail, setRegisterEmail] = useState('')
	const [registerPassword, setRegisterPassword] = useState('')
	const [nickname, setNickname] = useState('')

	const usersCollectionRef = collection(firebaseDB, 'users')

	const register = async () => {
		try {
			const user = await createUserWithEmailAndPassword(
				firebaseAuth,
				registerEmail,
				registerPassword,
			)
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
			<input
				placeholder='별명'
				onChange={(event) => {
					setNickname(event.target.value)
				}}
			/>
			<button onClick={register}> Create User</button>
		</div>
	)
}
