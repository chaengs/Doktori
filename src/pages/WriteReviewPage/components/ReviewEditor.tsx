import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { firebaseDB } from '../../../firebase-config'
import { addDoc, collection, doc, DocumentData, updateDoc } from 'firebase/firestore'

import BookContainer from './BookContainer'

import { ReviewType } from 'types/review'
import { ReviewEditorBookInfo } from 'types/bookType'

import { getStringDate } from 'util/getStringDate'

import styled from 'styled-components'
import { palette } from 'styles/palette'
import ButtonStyle from 'styles/ButtonStyle'
import ScoreBox from './ScoreBox'

interface EditPage {
	isEdit: boolean
	originData?: ReviewType //edit
	reviewId?: string //edit
	user?: DocumentData //create
	bookData?: ReviewEditorBookInfo | any //create
}

export default function ReviewEditor({ isEdit, originData, reviewId, user, bookData }: EditPage) {
	const [content, setContent] = useState('')
	const [date, setDate] = useState<string | number | readonly string[]>(getStringDate(new Date()))
	const [buttonActive, setButtonActive] = useState<boolean>(true)

	//별점용 도토리
	const [score, setScore] = useState(0)

	const reviewsCollectionRef = collection(firebaseDB, 'bookReviews')

	const navigate = useNavigate()

	//수정인지 확인하여 value 반영
	useEffect(() => {
		if (isEdit && originData) {
			setDate(originData.finishDate)
			setContent(originData.contents)
			setScore(originData.score)
		}
	}, [isEdit, originData])

	//유효성검사에 따른 버튼 활성화 (독후감 10자 이상, 점수 필수)
	useEffect(() => {
		if (content.length > 10 && content.length < 1500 && score > 0) {
			setButtonActive(false)
		} else {
			setButtonActive(true)
		}
	}, [content, score])

	const editHandler = () => {
		if (isEdit && originData && reviewId) {
			const editReviewRef = doc(firebaseDB, 'bookReviews', reviewId)
			updateDoc(editReviewRef, {
				contents: content,
				score: score,
				registerDate: getStringDate(new Date()),
				finishDate: date,
			})
				.then(() => {
					alert('독후감이 수정되었습니다.')
					navigate(-1)
				})
				.catch((error) => {
					if (error instanceof Error) {
						console.log(error.message)
					}
				})
		}
	}

	const createHandler = () => {
		if (!isEdit) {
			addDoc(reviewsCollectionRef, {
				bookThumbnail: bookData?.bookThumbnail,
				bookTitle: bookData?.bookTitle,
				bookAuthors: bookData?.bookAuthors,
				bookIsbn: bookData?.bookIsbn,
				publisher: bookData?.publisher,
				writer: user?.nickname,
				writerId: user?.uid,
				contents: content,
				score: score,
				registerDate: getStringDate(new Date()),
				finishDate: date,
			})
				.then(() => {
					alert('당신의 다독을 응원할게요!')
					navigate(-1)
				})
				.catch((error) => {
					if (error instanceof Error) {
						console.log(error.message)
					}
				})
		}
	}

	return (
		<ReviewContainer>
			<BookContainer bookInfo={isEdit ? originData : bookData} />
			<ReviewEditorContainer>
				<ScoreBox setScore={setScore} score={score} />
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
					placeholder='독서는 즐거우셨나요? 여러분의 감상을 적어주세요. (10자 이상, 1500자 이하)'
					onChange={(event) => {
						setContent(event.target.value)
					}}
					value={content}
				/>
				<SubmitButton
					onClick={isEdit ? editHandler : createHandler}
					disabled={buttonActive}
					className={buttonActive ? 'buttonOff' : 'buttonOn'}
				>
					{isEdit ? '수정 완료' : '작성 완료'}
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
	margin-bottom: 40px;
	padding: 30px;
	display: flex;
	flex-direction: column;
	justify-content: center;
`

const ReviewEditorContainer = styled.section`
	display: flex;
	flex-direction: column;
	align-items: center;
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
const SubmitButton = styled(ButtonStyle)`
	&.buttonOff {
		opacity: 0.3;
	}
	&.buttonOn {
		opacity: 1;
	}
`
