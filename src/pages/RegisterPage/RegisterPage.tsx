import React, { useState } from 'react'
import { firebaseAuth, firebaseDB } from '../../firebase-config'
import { addDoc, collection } from 'firebase/firestore'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import styled from 'styled-components'
import { palette } from 'styles/palette'
import ButtonStyle from 'styles/ButtonStyle'
import FormStyle from 'styles/FormStyle'
import InputStyle from 'styles/InputStyle'

export default function RegisterPage() {
	const [registerEmail, setRegisterEmail] = useState('')
	const [registerPassword, setRegisterPassword] = useState('')
	const [nickname, setNickname] = useState('')

	const usersCollectionRef = collection(firebaseDB, 'users')

	const register = async () => {
		await createUserWithEmailAndPassword(firebaseAuth, registerEmail, registerPassword)
			.then((userCredential) => {
				const user = userCredential.user
				addDoc(usersCollectionRef, {
					email: registerEmail,
					password: registerPassword,
					nickname: nickname,
					uid: user.uid,
				})
			})
			.catch((error) => {
				if (error instanceof Error) {
					console.log(error.message)
				}
			})
	}

	return (
		<FormStyle onSubmit={register}>
			<Title>회원가입</Title>
			<InputStyle
				placeholder='이메일을 입력하세요.'
				onChange={(event) => {
					setRegisterEmail(event.target.value)
				}}
			/>
			<InputStyle
				placeholder='비밀번호를 입력하세요.'
				onChange={(event) => {
					setRegisterPassword(event.target.value)
				}}
			/>
			<InputStyle
				placeholder='별명을 입력하세요.'
				onChange={(event) => {
					setNickname(event.target.value)
				}}
			/>
			<ButtonStyle>Create User</ButtonStyle>
		</FormStyle>
	)
}

const Title = styled.h1`
	color: ${palette.backgroundColor};
	font-size: 28px;
	font-family: Cafe24Ssurround;
	margin-top: 20px;
`
