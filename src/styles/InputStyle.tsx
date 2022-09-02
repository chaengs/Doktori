import React from 'react'

import styled from 'styled-components'

interface InputType {
	placeholder?: string
	onChange?: React.ChangeEventHandler<HTMLInputElement>
	className?: string
	type?: string
}

const Input = styled.input`
	width: 500px;
	height: 50px;
	border-radius: 10px;
	margin-top: 20px;
	margin-bottom: 10px;
	padding-left: 10px;
	border: 2px solid;

	${({ theme }) => theme.media.mobile`
		width:90%;
 	`}
`
export default function InputStyle({ placeholder, onChange, className, type }: InputType) {
	return <Input placeholder={placeholder} onChange={onChange} className={className} type={type} />
}
