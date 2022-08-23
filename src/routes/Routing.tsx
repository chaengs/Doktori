import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from '../components/Header'
import RegisterPage from '../pages/\bRegisterPage/RegisterPage'
import DetailPage from '../pages/DetailPage/DetailPage'
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
					<Route path={Path.Login} element={<LoginPage />} />
					<Route path={Path.Register} element={<RegisterPage />} />
					<Route path={Path.detail} element={<DetailPage />} />
					<Route path={Path.ReviewEditor} element={<ReviewEditPage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default Routing
