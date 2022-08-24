import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from '../components/Header'
import RegisterPage from '../pages/\bRegisterPage/RegisterPage'
import BookDetailPage from '../pages/DetailPage/BookDetailPage'
import LandingPage from '../pages/landingPage/LandingPage'
import LoginPage from '../pages/LoginPage/LoginPage'
import MainPage from '../pages/SearchPage/SearchPage'
import ReviewEditPage from '../pages/ReviewEditPage.tsx/ReviewEditPage'
import Path from './Path'
import SearchPage from '../pages/SearchPage/SearchPage'

function Routing() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<LandingPage />} />
				<Route element={<Header />}>
					<Route path={Path.main} element={<MainPage />} />
					<Route path={Path.search} element={<SearchPage />} />
					<Route path={Path.login} element={<LoginPage />} />
					<Route path={Path.register} element={<RegisterPage />} />
					<Route path={Path.bookDetail} element={<BookDetailPage />} />
					<Route path={Path.reviewEditor} element={<ReviewEditPage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default Routing
