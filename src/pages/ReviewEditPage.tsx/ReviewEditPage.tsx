import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { firebaseAuth, firebaseDB } from '../../Firebase'
import { addDoc, collection } from 'firebase/firestore'

import { ReviewBookType } from '../../types/bookType'
import { ReviewType } from '../../types/bookType'
import { getStringDate } from 'util/getStringDate'

import { GiAcorn } from 'react-icons/gi'
import { palette } from 'styles/palette'

export default function ReviewEditPage() {
	//BookCard 컴포넌트에서 prop 받아옴
	const { state } = useLocation()
	const { bookThumbnail, bookTitle, bookAuthors, bookIsbn, publisher } = state as ReviewBookType

	const [content, setContent] = useState('')
	const [date, setDate] = useState<string | number | readonly string[]>(getStringDate(new Date()))
	const [buttonActive, setButtonActive] = useState<boolean>(true)

	const [hovered, setHovered] = useState(0)
	const [score, setScore] = useState(0)

	const reviewsCollectionRef = collection(firebaseDB, 'bookReviews')

	const navigate = useNavigate()
	const textareaInput = useRef() as React.MutableRefObject<HTMLTextAreaElement>

	//유효성검사에 따른 버튼 활성화 (독후감 10자 이상, 점수 필수)
	useEffect(() => {
		if (content.length > 10 && score > 0) {
			setButtonActive(true)
			setButtonActive(false)
		} else {
			setButtonActive(true)
		}
	}, [content, score])

	const createReview = async () => {
		const writer = firebaseAuth.currentUser?.email
		const writerId = firebaseAuth.currentUser?.uid
		try {
			await addDoc(reviewsCollectionRef, {
				bookThumbnail: bookThumbnail,
				bookTitle: bookTitle,
				bookAuthors: bookAuthors,
				bookIsbn: bookIsbn,
				writer: writer,
				contents: content,
				score: score,
				registerDate: getStringDate(new Date()),
				finishDate: date,
				writerId: writerId,
			})
			alert('당신의 다독을 응원할게요!')
			navigate('/main')
		} catch (error) {
			if (error instanceof Error) {
				console.log(error.message)
			}
		}
	}

	return (
		<ReviewContainer>
			<BookInfoContainer>
				<img src={bookThumbnail} alt={bookTitle} />
				<div>
					<BookTitle>{bookTitle}</BookTitle>
					<p>{bookAuthors} 지음</p>
					<p>{publisher} 펴냄</p>
				</div>
			</BookInfoContainer>
			<ReviewEditorContainer>
				<ScoreBox>
					{[1, 2, 3, 4, 5].map((el) => (
						<GiAcorn
							className={`acorn ${(score >= el || hovered >= el) && 'green'}`}
							key={el}
							onMouseEnter={() => setHovered(el)}
							onMouseLeave={() => setHovered(0)}
							onClick={() => setScore(el)}
						/>
					))}
				</ScoreBox>
				<DateBox>
					<p>완독 날짜</p>
					<DateInput
						className='input_date'
						type='date'
						value={date}
						onChange={(e) => setDate(e.target.value)}
					/>
				</DateBox>
				<ContentInput
					placeholder='독서는 즐거우셨나요? 여러분의 감상을 적어주세요. (10자 이상)'
					onChange={(event) => {
						setContent(event.target.value)
					}}
					ref={textareaInput}
				/>
				<SubmitButton
					onClick={createReview}
					disabled={buttonActive}
					className={buttonActive ? 'buttonOff' : 'buttonOn'}
				>
					독후감 작성 완료
				</SubmitButton>
			</ReviewEditorContainer>
		</ReviewContainer>
	)
}

const ReviewContainer = styled.article`
	width: 80%;
	height: 80%;
	background-color: ${palette.backgroundWhiteColor};
	border-radius: 20px;
	box-shadow: 0px 0px 5px 10px rgba(0, 0, 0, 0.2);
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	justify-content: center;
	position: relative;
	top: 5%;
`

const BookInfoContainer = styled.section`
	font-size: 20px;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-bottom: 10px;
	img {
		width: 120px;
		height: auto;
	}

	div {
		margin-left: 20px;
	}

	p {
		margin-bottom: 10px;
	}
`

const BookTitle = styled.p`
	font-size: 30px;
`

const ReviewEditorContainer = styled.section`
	display: flex;
	flex-direction: column;
	align-items: center;
`
const ScoreBox = styled.div`
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
const DateBox = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 15px;
	p {
		font-size: 20px;
		margin-right: 10px;
	}
`
const DateInput = styled.input`
	width: auto;
	height: 40px;
	font-size: 18px;
	border: 2px solid ${palette.mainColor};
	border-radius: 7px;
	padding: 5px;
`

const ContentInput = styled.textarea`
	width: 700px;
	height: 30vh;
	font-size: 20px;
	padding: 10px;
	border: 2px solid ${palette.mainColor};
	border-radius: 7px;
`
const SubmitButton = styled.button`
	width: 140px;
	height: 40px;
	color: #fff;
	font-size: 20px;
	font-weight: bold;
	border-radius: 7px;
	margin-top: 20px;
	background-color: ${palette.buttonColor};

	&.buttonOff {
		opacity: 0.3;
	}
	&.buttonOn {
		opacity: 1;
	}
`
