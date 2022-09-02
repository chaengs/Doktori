import React from 'react'
import styled from 'styled-components'
import { theme } from 'styles/theme'

interface DateBoxType {
	date: string
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

function DateBox({ date, onChange }: DateBoxType) {
	return (
		<DateContainer>
			<p>완독 날짜</p>
			<DateInput
				className='input_date'
				type='date'
				value={date}
				onChange={(event) => onChange(event)}
			/>
		</DateContainer>
	)
}

export default React.memo(DateBox)

const DateContainer = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 15px;
	font-size: 20px;
	p {
		margin-right: 10px;
	}

	${({ theme }) => theme.media.mobile`
		font-size:${theme.fontSize.mobileTitle};
 	`}
`
const DateInput = styled.input`
	width: auto;
	height: 40px;
	font-size: 18px;
	border: 2px solid ${theme.color.yellowgreen};
	border-radius: 7px;
	padding: 5px;

	${({ theme }) => theme.media.mobile`
		font-size:${theme.fontSize.mobileDesc};
 	`}
`
