import React, { useState } from 'react'

import styled from 'styled-components'
import { theme } from 'styles/theme'
import { GiAcorn } from 'react-icons/gi'

function ScoreBox({ setScore, score }: any) {
	const [hovered, setHovered] = useState(0)

	return (
		<Score>
			{[1, 2, 3, 4, 5].map((el) => (
				<GiAcorn
					className={`acorn ${(score >= el || hovered >= el) && 'green'}`}
					key={el}
					onMouseEnter={() => setHovered(el)}
					onMouseLeave={() => setHovered(0)}
					onClick={() => setScore(el)}
				/>
			))}
		</Score>
	)
}

export default React.memo(ScoreBox)

const Score = styled.div`
	font-size: 30px;
	.acorn {
		opacity: 0.3;
		margin: 10px 10px 15px 0;
		cursor: pointer;
	}

	.green {
		color: ${theme.color.green};
		opacity: 1;
	}

	${({ theme }) => theme.media.mobile`
		font-size:${theme.fontSize.desktopDesc}
 	`}
`
