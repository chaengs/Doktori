import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { firebaseAuth, firebaseDB } from 'firebase-config'
import { deleteDoc, DocumentData, doc } from 'firebase/firestore'

import useSearchReviewById from 'hooks/useSearchReviewById'

import styled from 'styled-components'
import { theme } from 'styles/theme'
import { GiAcorn } from 'react-icons/gi'
import Loading from 'components/Loading'
import { NoImageContext } from 'context/NoImageContext'

interface type {
	writerId: string
	reviewId: string
}

export default function ReviewDetailPage() {
	const [isWriter, setIsWriter] = useState<boolean>(false)
	const [reviewData, setReviewData] = useState<DocumentData>()

	const navigate = useNavigate()

	const [loading, setLoading] = useState<boolean>(true)

	const { onErrorImage } = useContext(NoImageContext)

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
			setTimeout(() => {
				setLoading(false)
			}, 500)
		}
	}, [originData])

	return (
		<>
			{loading ? <Loading /> : null}
			<ReviewContainer>
				<BookInfoContainer>
					<BookImg
						src={reviewData?.bookThumbnail}
						alt={reviewData?.bookTitle}
						onClick={moveToDetailPage}
						onError={onErrorImage}
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
				{isWriter && (
					<ButtonBox>
						<EditButton onClick={moveToEditPage}>수정하기</EditButton>
						<DeleteButton onClick={deleteReview}>삭제하기</DeleteButton>
					</ButtonBox>
				)}
			</ReviewContainer>
		</>
	)
}

const ReviewContainer = styled.article`
	width: 80%;
	height: auto;
	background-color: ${theme.color.ivory};
	border-radius: 20px;
	box-shadow: 0px 0px 5px 10px rgba(0, 0, 0, 0.2);
	margin: 0 auto;
	padding: 20px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position: relative;
	top: 5%;
	${({ theme }) => theme.media.mobile`
		width: 96%;
		height: auto;
		top:10px;
		margin-bottom:30px;
 	`}
`

const BookInfoContainer = styled.section`
	font-size: 20px;
	display: flex;
	align-items: center;
	margin-bottom: 10px;

	p {
		margin-bottom: 8px;
	}
	${({ theme }) => theme.media.mobile`
		font-size:${theme.fontSize.mobileDesc};
 	`}
`
const BookImg = styled.img`
	width: 120px;
	height: auto;
	cursor: pointer;
	${({ theme }) => theme.media.mobile`
		width:100px;
 	`}
`

const BookInfoBox = styled.div`
	margin-left: 20px;
`

const BookTitle = styled.p`
	font-size: 30px;
	cursor: pointer;
	${({ theme }) => theme.media.mobile`
		font-size:${theme.fontSize.mobileTitle};
 	`}
`

const ScoreBox = styled.div`
	margin-bottom: 5px;
	font-size: 20px;
	.acorn {
		opacity: 0.3;
	}

	.green {
		color: ${theme.color.green};
		opacity: 1;
	}
	${({ theme }) => theme.media.mobile`
		font-size:${theme.fontSize.mobileDesc};
 	`}
`
const WriterInfo = styled.div`
	margin-bottom: 15px;
	p {
		margin-right: 10px;
	}
`
const ContentBox = styled.section`
	width: 65%;
	font-size: 20px;
	line-height: 25px;
	background-color: ${theme.color.lightYellowgreen};
	border-radius: 7px;
	padding: 10px;
	${({ theme }) => theme.media.mobile`
		width: 93%;
		font-size:${theme.fontSize.mobileTitle};
 	`}
`

const ButtonBox = styled.div`
	margin-top: 10px;
`
const EditButton = styled.button`
	width: 100px;
	height: 50px;
	font-family: Cafe24Ssurround;
	font-size: 20px;
	color: ${theme.color.green};
	border-radius: 7px;
	background-color: ${theme.color.yellowgreen};
	margin-right: 10px;
	${({ theme }) => theme.media.mobile`
		width:80px;
		height:35px;
		font-size:${theme.fontSize.mobileTitle};
 	`}
`

const DeleteButton = styled(EditButton)`
	background-color: ${theme.color.orange};
	color: ${theme.color.ivory};
`
