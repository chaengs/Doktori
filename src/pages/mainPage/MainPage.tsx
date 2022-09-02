import React from 'react'

import ReviewCardContainer from './components/ReviewCardContainer'

import styled from 'styled-components'
import readingImg from 'library/images/reading.svg'
import { theme } from 'styles/theme'

export default function MainPage() {
	return (
		<div>
			<Introduce>
				<div>
					<p>다람쥐가 도토리를 차곡차곡 모으듯이</p>
					<p>책을 한 권, 한 권 읽으며 독토리를 마음속에 쌓아보세요.</p>
				</div>
				<img src={readingImg} />
			</Introduce>
			<ReviewCardContainer />
		</div>
	)
}

const Introduce = styled.div`
	width: 100vw;
	height: 300px;
	font-size: ${theme.fontSize.desktopTitle};
	font-weight: bolder;
	color: ${theme.color.green};
	background-color: ${theme.color.ivory};
	margin-top: 50px;
	display: flex;
	align-items: center;
	justify-content: center;

	p {
		margin-bottom: 20px;
	}

	img {
		width: 300px;
		height: auto;
		margin-left: 40px;
	}

	${({ theme }) => theme.media.mobile`
		height:100px;
		font-size:17px;

		p {
			margin-bottom:3px;
		}

		img {
			display:none;
		}
 	`}
`
