import React from 'react'

import ReviewCardContainer from './components/ReviewCardContainer'

import styled from 'styled-components'
import { palette } from 'styles/palette'
import readingImg from 'library/images/reading.svg'

export default function MainPage() {
	return (
		<div>
			<Introduce>
				<div>
					<p>다람쥐가 도토리를 차곡차곡 모으듯이</p>
					<p>책을 한 권, 한 권 읽으며 독토리를 마음속에 쌓아보세요</p>
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
	font-size: 35px;
	font-weight: bolder;
	color: ${palette.pointColor};
	background-color: ${palette.backgroundWhiteColor};
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
`
