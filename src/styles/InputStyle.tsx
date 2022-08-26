import React from 'react'
import styled from 'styled-components'
import { palette } from './palette'

interface InputType {
	placeholder?: string
	onChange?: React.ChangeEventHandler<HTMLInputElement>
}

const Input = styled.input`
	width: 500px;
	height: 50px;
	border: 2px solid ${palette.pointColor};
	border-radius: 10px;
	margin-top: 20px;
	margin-bottom: 20px;
	padding-left: 10px;
`

export default function FormStyle({ placeholder, onChange }: InputType) {
	return <Input placeholder={placeholder} onChange={onChange} />
}
