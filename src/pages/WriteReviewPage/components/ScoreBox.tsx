import React, { useState } from 'react'
import { GiAcorn } from 'react-icons/gi'
import styled from 'styled-components'
import { palette } from 'styles/palette'

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

const Score = styled.div`
	.acorn {
		font-size: 30px;
		opacity: 0.3;
		margin: 10px 10px 15px 0;
		cursor: pointer;
	}

	.green {
		color: ${palette.mainColor};
		opacity: 1;
	}
`

export default React.memo(ScoreBox)
