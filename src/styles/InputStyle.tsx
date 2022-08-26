import React from 'react'
import styled from 'styled-components'
import { palette } from './palette'

interface InputType {
	placeholder?: string
	onChange?: React.ChangeEventHandler<HTMLInputElement>
	className?: string
}

const Input = styled.input`
	width: 500px;
	height: 50px;
	border-radius: 10px;
	margin-top: 20px;
	margin-bottom: 10px;
	padding-left: 10px;
	border: 2px solid;
`
export default function InputStyle({ placeholder, onChange, className }: InputType) {
	return <Input placeholder={placeholder} onChange={onChange} className={className} />
}
