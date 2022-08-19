import React from 'react'
import { signOut } from 'firebase/auth'
import { firebaseAuth } from '../Firebase'
import { Outlet, useNavigate } from 'react-router-dom'

export default function Header() {
	const navigate = useNavigate()
	const logout = async () => {
		localStorage.removeItem('email')
		localStorage.removeItem('uid')
		await signOut(firebaseAuth)
	}

	// if (localStorage.getItem('email')) {
	// 	return <button onClick={logout}>로그아웃</button>
	// } else {
	// 	return <button onClick={() => navigate('/login')}>로그인</button>
	// }

	return (
		<>
			<header>
				<p>독토리</p>
			</header>
			{localStorage.getItem('email') ? (
				<button onClick={logout}>로그아웃</button>
			) : (
				<button onClick={() => navigate('/login')}>로그인</button>
			)}
			<Outlet />
		</>
	)
}
