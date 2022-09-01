import React from 'react'

import styled from 'styled-components'
import { palette } from './palette'

interface FormType {
	children: React.ReactNode
	onSubmit?: () => void
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
	justify-content: center;
	align-items: center;
`

export default function FormStyle({ children, onSubmit }: FormType) {
	return <FormContainer onSubmit={onSubmit}>{children}</FormContainer>
}
