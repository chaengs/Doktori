import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from '../components/Header'
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
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default Routing
