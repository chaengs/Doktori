import React from 'react'

import styled from 'styled-components'
import { theme } from './theme'

interface ButtonType {
	children: React.ReactNode
	onClick?: React.MouseEventHandler<HTMLButtonElement>
	disabled?: boolean
	className?: string
	type?: 'button' | 'submit' | 'reset' | undefined
}

const StyledButton = styled.button`
	width: 140px;
	height: 40px;
	font-size: 20px;
	font-family: Cafe24Ssurround;
	font-weight: bold;
	color: #fff;
	background-color: ${theme.color.brown};
	border-radius: 7px;
	margin-top: 20px;
	${({ theme }) => theme.media.mobile`
		width:130px;
		height:35px;
		font-size:${theme.fontSize.mobileTitle};
 	`}
`
export default function ButtonStyle({ children, ...rest }: ButtonType) {
	return <StyledButton {...rest}>{children}</StyledButton>
}
