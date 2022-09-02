import React from 'react'

import styled from 'styled-components'
import { theme } from './theme'

interface FormType {
	children: React.ReactNode
	onSubmit?: () => void
}

const FormContainer = styled.form`
	width: 700px;
	height: 500px;
	background-color: ${theme.color.ivory};
	border: 2px solid ${theme.color.green};
	border-radius: 10px;
	box-shadow: 0px 0px 5px 10px rgba(0, 0, 0, 0.2);
	margin: 0 auto;
	position: relative;
	top: 20%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	${({ theme }) => theme.media.mobile`
		width:350px;
		height:420px;
 	`}
`

export default function FormStyle({ children, onSubmit }: FormType) {
	return <FormContainer onSubmit={onSubmit}>{children}</FormContainer>
}
