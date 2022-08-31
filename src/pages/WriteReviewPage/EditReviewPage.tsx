import React from 'react'
import { useLocation } from 'react-router-dom'
import ReviewEditor from './components/ReviewEditor'
import useSearchReviewById from 'hooks/useSearchReviewById'
import styled from 'styled-components'
import { ReviewType } from 'types/review'

export default function EditReviewPage() {
	type reviewIdType = {
		reviewId: string
	}

	//BookDetailPage에서 받음
	const { state } = useLocation()
	const { reviewId } = state as reviewIdType
	const originData = useSearchReviewById(reviewId) as ReviewType

	return (
		<EditorContainer>
			<ReviewEditor isEdit={true} originData={originData} reviewId={reviewId} />
		</EditorContainer>
	)
}

const EditorContainer = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
`
