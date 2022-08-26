import React from 'react'
import styled from 'styled-components'
import { palette } from './palette'

interface ButtonType {
	children: React.ReactNode
	onClick: React.MouseEventHandler<HTMLButtonElement>
	disabled?: boolean
	className?: string
}

const StyledButton = styled.button`
	width: 140px;
	height: 40px;
	font-size: 20px;
	font-weight: bold;
	color: #fff;
	background-color: ${palette.buttonColor};
	border-radius: 7px;
	margin-top: 20px;
`
export default function ButtonStyle({ children, onClick }: ButtonType) {
	return <StyledButton onClick={onClick}>{children}</StyledButton>
}
