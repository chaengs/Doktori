import React from 'react'

interface type {
	direction: string
	onClick: React.MouseEventHandler<HTMLButtonElement>
}
export default function SlideButton({ direction, onClick }: type) {
	return (
		<button onClick={onClick} className={`btn-slide-control btn-${direction}`}>
			버튼
		</button>
	)
}
