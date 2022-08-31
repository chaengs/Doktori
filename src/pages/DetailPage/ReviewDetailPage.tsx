import { firebaseAuth, firebaseDB } from 'firebase-config'
import { deleteDoc, DocumentData, doc } from 'firebase/firestore'
import useSearchReviewById from 'hooks/useSearchReviewById'
import React, { useEffect, useState } from 'react'
import { GiAcorn } from 'react-icons/gi'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { palette } from 'styles/palette'

interface type {
	writerId: string
	reviewId: string
}

export default function ReviewDetailPage() {
	const [isWriter, setIsWriter] = useState<boolean>(false)
	const [reviewData, setReviewData] = useState<DocumentData>()

	const navigate = useNavigate()

	//메인페이지 or BookDetailPage의 ReviewCard에서 받아옴
	const { state } = useLocation()
	const { writerId, reviewId } = state as type

	const moveToDetailPage = () => {
		navigate('/bookdetail', {
			state: {
				title: reviewData?.bookTitle,
			},
		})
	}

	const moveToEditPage = () => {
		navigate('/editReview', {
			state: {
				reviewId: reviewId,
			},
		})
	}

	const deleteReview = () => {
		const confirmDelete = confirm('독후감을 삭제하시겠습니까?')
		if (confirmDelete) {
			deleteDoc(doc(firebaseDB, 'bookReviews', reviewId)).then(() => {
				navigate(-1)
			})
		}
	}

	// 리뷰데이터 요청 / 작성자와 로그인유저 일치여부
	const originData = useSearchReviewById(reviewId)
	const loggedUser = firebaseAuth.currentUser?.uid
	useEffect(() => {
		if (writerId == loggedUser) {
			setIsWriter(true)
		} else {
			setIsWriter(false)
		}

		if (originData) {
			setReviewData(originData)
		}
	}, [originData])

	return (
		<ReviewContainer>
			{isWriter && (
				<div>
					<button onClick={moveToEditPage}>수정하기</button>
					<button onClick={deleteReview}>삭제하기</button>
				</div>
			)}
			<BookInfoContainer>
				<BookImg
					src={reviewData?.bookThumbnail}
					alt={reviewData?.bookTitle}
					onClick={moveToDetailPage}
				/>
				<BookInfoBox>
					<BookTitle onClick={moveToDetailPage}>{reviewData?.bookTitle}</BookTitle>
					<p>
						{reviewData?.bookAuthors} 지음 | {reviewData?.publisher} 펴냄
					</p>
					<ScoreBox>
						{[1, 2, 3, 4, 5].map((el) => (
							<GiAcorn className={`acorn ${reviewData?.score >= el && 'green'}`} key={el} />
						))}
					</ScoreBox>
					<WriterInfo>
						<p>작성자 : {reviewData?.writer}</p>
						<p>완독일 : {reviewData?.finishDate}</p>
						<p>독후감 작성일 : {reviewData?.registerDate}</p>
					</WriterInfo>
				</BookInfoBox>
			</BookInfoContainer>
			<ContentBox>
				<p>{reviewData?.contents}</p>
			</ContentBox>
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
	align-items: center;
	position: relative;
	top: 5%;
`

const BookInfoContainer = styled.section`
	font-size: 20px;
	display: flex;
	align-items: center;
	margin-bottom: 10px;
	img {
		width: 120px;
		height: auto;
	}

	p {
		margin-bottom: 8px;
	}
`
const BookImg = styled.img`
	width: 120px;
	height: auto;
	cursor: pointer;
`

const BookInfoBox = styled.div`
	margin-left: 20px;
`

const BookTitle = styled.p`
	font-size: 30px;
	cursor: pointer;
`

const ScoreBox = styled.div`
	margin-bottom: 5px;
	.acorn {
		font-size: 20px;
		opacity: 0.3;
	}

	.green {
		color: ${palette.mainColor};
		opacity: 1;
	}
`
const WriterInfo = styled.div`
	margin-bottom: 15px;
	p {
		font-size: 20px;
		margin-right: 10px;
	}
`
const ContentBox = styled.section`
	width: 65%;
	font-size: 20px;
	line-height: 25px;
	background-color: ${palette.textBackgroundColor};
	border-radius: 7px;
	padding: 10px;
`
