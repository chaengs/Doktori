import React, { useContext } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Header from '../components/Header'
import RegisterPage from 'pages/RegisterPage/RegisterPage'
import BookDetailPage from '../pages/DetailPage/BookDetailPage'
import LandingPage from '../pages/landingPage/LandingPage'
import LoginPage from '../pages/LoginPage/LoginPage'
import MainPage from '../pages/SearchPage/SearchPage'
import ReviewEditPage from '../pages/ReviewEditPage.tsx/ReviewEditPage'
import Path from './Path'
import SearchPage from '../pages/SearchPage/SearchPage'
import ReviewDetailPage from 'pages/DetailPage/ReviewDetailPage'
import { AdminAuthContext } from 'context/AdminAuthContext'
import PrivateRoute from './PrivateRoute'

function Routing() {
	const { isLoggedIn } = useContext(AdminAuthContext)

	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<LandingPage />} />
				<Route element={<Header />}>
					{/* 비로그인 상태에도 접근 가능 */}
					<Route path={Path.main} element={<MainPage />} />
					<Route path={Path.search} element={<SearchPage />} />
					<Route path={Path.bookDetail} element={<BookDetailPage />} />
					<Route path={Path.reviewDetail} element={<ReviewDetailPage />} />
					{/* 비로그인 상태로만 접근 가능 */}
					<Route
						path={Path.login}
						element={isLoggedIn ? <Navigate to={'/main'} /> : <LoginPage />}
					/>
					<Route
						path={Path.register}
						element={isLoggedIn ? <Navigate to={'/main'} /> : <RegisterPage />}
					/>
					{/* 404페이지 */}
					{/* 로그인 상태로만 접근 가능 */}
					<Route
						path={Path.reviewEditor}
						element={
							<PrivateRoute auth={isLoggedIn}>
								<ReviewEditPage />
							</PrivateRoute>
						}
					/>
					{/* <Route path={Path.reviewEditor} element={isLoggedIn && <ReviewEditPage />} /> */}
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default Routing
