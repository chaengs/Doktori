import React, { createContext, useEffect, useState } from 'react'

import { firebaseAuth } from 'firebase-config'
import {
	browserLocalPersistence,
	onAuthStateChanged,
	setPersistence,
	signInWithEmailAndPassword,
	signOut,
} from 'firebase/auth'

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
		onAuthStateChanged(firebaseAuth, (user) => {
			if (user) {
				setIsloggedIn(true)
			} else {
				setIsloggedIn(false)
			}
		})
	}, [])

	const login = (email: string, password: string) => {
		setPersistence(firebaseAuth, browserLocalPersistence).then(() => {
			signInWithEmailAndPassword(firebaseAuth, email, password)
				.then(() => {
					localStorage.setItem('userEmail', email)
					alert('로그인 되었습니다.')
				})
				.catch((error) => {
					if (error instanceof Error) {
						console.log(error.message)
					}
					if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
						alert('이메일 또는 비밀번호가 틀립니다.')
					}
				})
		})
	}
	const logout = () => {
		signOut(firebaseAuth)
			.then(() => {
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
