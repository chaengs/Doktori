import { firebaseAuth } from 'firebase-config'
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import React, { createContext, useEffect, useState } from 'react'

interface AdminAuthContextType {
	isLoggedIn: boolean
	login: (email: string, password: string) => void
	logout: () => void
}

export const AdminAuthContext = createContext<AdminAuthContextType>({
	isLoggedIn: false,
	login: () => {
		return
	},
	logout: () => {
		return
	},
})

interface ImportChildren {
	children?: React.ReactNode
}

export function AdminAuthProvider({ children }: ImportChildren) {
	const [isLoggedIn, setIsloggedIn] = useState(false)

	useEffect(() => {
		const localLoggedState = localStorage.getItem('localLoggedIn')
		localLoggedState && setIsloggedIn(true)
	}, [])

	const login = (email: string, password: string) => {
		signInWithEmailAndPassword(firebaseAuth, email, password)
			.then((userCredential) => {
				const user = userCredential.user
				setIsloggedIn(true)
				localStorage.setItem('localLoggedIn', 'true')
				localStorage.setItem('userEmail', email)
			})
			.catch((error) => {
				if (error instanceof Error) {
					console.log(error.message)
				}
				alert('이메일 또는 비밀번호가 틀립니다.')
			})
	}
	const logout = () => {
		signOut(firebaseAuth)
			.then(() => {
				setIsloggedIn(false)
				localStorage.removeItem('localLoggedIn')
				alert('로그아웃 되었습니다.')
			})
			.catch((error) => {
				if (error instanceof Error) {
					console.log(error.message)
				}
			})
	}
	return (
		<AdminAuthContext.Provider value={{ isLoggedIn, login, logout }}>
			{children}
		</AdminAuthContext.Provider>
	)
}
