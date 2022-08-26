import React, { useState } from 'react'
import { firebaseAuth, firebaseDB } from '../../firebase-config'
import { addDoc, collection } from 'firebase/firestore'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import styled from 'styled-components'
import { palette } from 'styles/palette'
import ButtonStyle from 'styles/ButtonStyle'

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
		<FormContainer>
			<Title>회원가입 </Title>
			<Input
				placeholder='이메일을 입력하세요.'
				onChange={(event) => {
					setRegisterEmail(event.target.value)
				}}
			/>
			<Input
				placeholder='비밀번호를 입력하세요.'
				onChange={(event) => {
					setRegisterPassword(event.target.value)
				}}
			/>
			<Input
				placeholder='별명을 입력하세요.'
				onChange={(event) => {
					setNickname(event.target.value)
				}}
			/>
			<ButtonStyle onClick={register}>Create User</ButtonStyle>
		</FormContainer>
	)
}

const FormContainer = styled.form`
	width: 700px;
	height: 500px;
	background-color: ${palette.backgroundWhiteColor};
	border: 2px solid ${palette.pointColor};
	border-radius: 10px;
	box-shadow: 0px 0px 5px 10px rgba(0, 0, 0, 0.2);
	margin: 0 auto;
	position: relative;
	top: 20%;
	display: flex;
	flex-direction: column;
	align-items: center;
`

const Title = styled.h1`
	color: ${palette.backgroundColor};
	font-size: 28px;
	font-family: Cafe24Ssurround;
	margin-top: 20px;
`

const Input = styled.input`
	width: 500px;
	height: 50px;
	border: 2px solid ${palette.pointColor};
	border-radius: 10px;
	margin-top: 60px;
	padding-left: 10px;
	padding-right: 10px;
`
