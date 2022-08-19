import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from '../components/Header'
import RegisterPage from '../pages/\bRegisterPage/RegisterPage'
import DetailPage from '../pages/DetailPage/DetailPage'
import LandingPage from '../pages/landingPage/LandingPage'
import MainPage from '../pages/mainPage/MainPage'
import Path from './Path'

function Routing() {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<Header />}>
					<Route path='/' element={<LandingPage />} />
					<Route path={Path.main} element={<MainPage />} />
					<Route path={Path.detail} element={<DetailPage />} />
					<Route path={Path.Register} element={<RegisterPage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default Routing
