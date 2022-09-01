import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { firebaseAuth, firebaseDB } from '../../firebase-config'
import { addDoc, collection } from 'firebase/firestore'
import { createUserWithEmailAndPassword } from 'firebase/auth'

import { checkEmailRegExp, checkPasswordRegExp } from 'util/checkRegExp'

import styled from 'styled-components'
import { palette } from 'styles/palette'
import ButtonStyle from 'styles/ButtonStyle'
import FormStyle from 'styles/FormStyle'
import InputStyle from 'styles/InputStyle'
import { AiFillEyeInvisible as CloseEyes, AiFillEye as OpenEyes } from 'react-icons/ai'

export default function RegisterPage() {
	const navigate = useNavigate()

	const [showPassword, setShowPassword] = useState<boolean>(false)

	// 유효성검사를 통과한 이메일과 비밀번호, 닉네임
	const [registerEmail, setRegisterEmail] = useState('')
	const [registerPassword, setRegisterPassword] = useState('')
	const [nickname, setNickname] = useState('')

	// 이메일, 비밀번호 유효성 검사 통과 여부
	const [validEmail, setValidEmail] = useState<boolean>(false)
	const [validPassword, setValidPassword] = useState<boolean>(false)

	const [buttonActive, setButtonActive] = useState<boolean>(true)

	const usersCollectionRef = collection(firebaseDB, 'users')

	const registerHandler = () => {
		event?.preventDefault()
		createUserWithEmailAndPassword(firebaseAuth, registerEmail, registerPassword)
			.then((userCredential) => {
				const user = userCredential.user
				addDoc(usersCollectionRef, {
					email: registerEmail,
					password: registerPassword,
					nickname: nickname,
					uid: user.uid,
				}).then(() => {
					alert('회원가입이 완료되었습니다.')
					navigate('/')
				})
			})
			.catch((error) => {
				if (error instanceof Error) {
					console.log(error.message)
				}
				if (error.code === 'auth/email-already-in-use') {
					alert('이미 존재하는 이메일입니다.')
				}
			})
		// }
	}

	const checkEmail = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const email = event.target.value
			if (checkEmailRegExp(email)) {
				setRegisterEmail(email)
				setValidEmail(true)
			} else {
				setValidEmail(false)
			}
		},
		[registerEmail],
	)

	const checkPassword = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const password = event.target.value
			if (checkPasswordRegExp(password)) {
				setRegisterPassword(password)
				setValidPassword(true)
			} else {
				setValidPassword(false)
			}
		},
		[registerPassword],
	)

	//유효성 검사에 따른 버튼 활성화
	useEffect(() => {
		validEmail && validPassword && nickname.length > 0
			? setButtonActive(false)
			: setButtonActive(true)
	}, [registerEmail, registerPassword, nickname])

	//비밀번호 보임, 숨김
	const showPasswordHandler = () => {
		event?.preventDefault()
		setShowPassword(!showPassword)
	}
	return (
		<FormStyle onSubmit={registerHandler}>
			<Title>회원가입</Title>
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
			<p className='sr-only'>비밀번호 숨김 또는 보임</p>
			<EyeButton onClick={showPasswordHandler}>
				{showPassword ? <OpenEyes /> : <CloseEyes />}
			</EyeButton>
			<InputStyle
				placeholder='별명을 입력하세요.'
				onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
					setNickname(event.target.value)
				}}
			/>
			<SubmitButton
				type='submit'
				disabled={buttonActive}
				className={buttonActive ? 'buttonOff' : 'buttonOn'}
			>
				가입하기
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

const EyeButton = styled.span`
	color: ${palette.pointColor};
	font-size: 25px;
	position: absolute;
	right: 10%;
`

const SubmitButton = styled(ButtonStyle)`
	&.buttonOff {
		opacity: 0.3;
	}
	&.buttonOn {
		opacity: 1;
	}
`
