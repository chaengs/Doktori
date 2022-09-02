import React from 'react'

import styled, { keyframes } from 'styled-components'
import logo from 'library/images/doctori_logo.png'
import { theme } from 'styles/theme'

export default function Loading() {
	return (
		<Background>
			<Spinner src={logo} alt='로딩중' />
		</Background>
	)
}

export const Background = styled.div`
	width: 100%;
	height: 100%;
	background-color: ${theme.color.yellowgreen};
	position: absolute;
	top: 0;
	left: 0;
	z-index: 999;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`
const spin = keyframes`
    from {
        transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
`

const Spinner = styled.img`
	width: 50px;
	height: auto;
	animation: ${spin} 2s linear infinite;
`
