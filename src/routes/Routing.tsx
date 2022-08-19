import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from '../components/Header'
import RegisterPage from '../pages/\bRegisterPage/RegisterPage'
import DetailPage from '../pages/DetailPage/DetailPage'
import Test from '../pages/DetailPage/test'
import LandingPage from '../pages/landingPage/LandingPage'
import LoginPage from '../pages/LoginPage/LoginPage'
import MainPage from '../pages/mainPage/MainPage'
import ReviewEditPage from '../pages/ReviewEditPage.tsx/ReviewEditPage'
import Path from './Path'

function Routing() {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<Header />}>
					{/* <Route path='/' element={<LandingPage />} /> */}
					<Route path='/' element={<Test />} />
					<Route path={Path.main} element={<MainPage />} />
					<Route path={Path.detail} element={<DetailPage />} />
					<Route path={Path.Register} element={<RegisterPage />} />
					<Route path={Path.ReviewEdit} element={<ReviewEditPage />} />
					<Route path={Path.Login} element={<LoginPage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default Routing
