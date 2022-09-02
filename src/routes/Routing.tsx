import React, { lazy, Suspense, useContext } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { AdminAuthContext } from 'context/AdminAuthContext'

import Path from './Path'

import Header from '../components/Header'

import MainPage from 'pages/MainPage/MainPage'
import SearchPage from 'pages/SearchPage/SearchPage'
import BookDetailPage from 'pages/DetailPage/BookDetailPage'
import ReviewDetailPage from 'pages/DetailPage/ReviewDetailPage'

import RegisterPage from 'pages/RegisterPage/RegisterPage'
import LoginPage from '../pages/LoginPage/LoginPage'

// import EditReviewPage from 'pages/WriteReviewPage/EditReviewPage'
// import CreateReviewPage from 'pages/WriteReviewPage/CreateReviewPage'
import MyPage from 'pages/MyPage/MyPage'
import MyBookShelf from 'pages/MyPage/MyBookShelf'
import MyProfile from 'pages/MyPage/MyProfile'
import Loading from 'components/Loading'

function Routing() {
	const { isLoggedIn } = useContext(AdminAuthContext)
	const EditReviewPage = lazy(() => import('pages/WriteReviewPage/EditReviewPage'))
	const CreateReviewPage = lazy(() => import('pages/WriteReviewPage/CreateReviewPage'))

	return (
		<BrowserRouter>
			<Suspense fallback={<Loading />}>
				<Routes>
					<Route element={<Header />}>
						{/* 비로그인 상태에도 접근 가능 */}
						<Route path={Path.main} element={<MainPage />} />
						<Route path={Path.search} element={<SearchPage />} />
						<Route path={Path.bookDetail} element={<BookDetailPage />} />
						<Route path={Path.reviewDetail} element={<ReviewDetailPage />} />
						{/* 비로그인 상태로만 접근 가능 */}
						<Route path={Path.login} element={isLoggedIn ? <Navigate to={'/'} /> : <LoginPage />} />
						<Route
							path={Path.register}
							element={isLoggedIn ? <Navigate to={'/'} /> : <RegisterPage />}
						/>
						{/* 404페이지 */}
						{/* 로그인 상태로만 접근 가능 */}
						{isLoggedIn && <Route path={Path.editReview} element={<EditReviewPage />} />}
						{isLoggedIn && <Route path={Path.createReview} element={<CreateReviewPage />} />}
						{isLoggedIn && <Route path={Path.myPage} element={<MyPage />} />}
						{isLoggedIn && <Route path={Path.myBookShelf} element={<MyBookShelf />} />}
						{isLoggedIn && <Route path={Path.myProfile} element={<MyProfile />} />}
					</Route>
				</Routes>
			</Suspense>
		</BrowserRouter>
	)
}

export default Routing
