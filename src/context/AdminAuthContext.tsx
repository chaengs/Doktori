import { firebaseAuth } from 'firebase-config'
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import React, { createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface AdminAuthContextType {
	isLoggedIn: boolean
	login: (email: string, password: string) => void
	logout: () => void
}

export const AdminAuthContext = createContext<AdminAuthContextType>({
	isLoggedIn: false,
	login: (email: string, password: string) => {
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
	// const navigate = useNavigate()

	const [isLoggedIn, setIsloggedIn] = useState(false)

	const login = async (email: string, password: string) => {
		await signInWithEmailAndPassword(firebaseAuth, email, password)
			.then((userCredential) => {
				const user = userCredential.user
				alert('로그인 되었습니다.')
				setIsloggedIn(true)
				// navigate('/main')
			})
			.catch((error) => {
				if (error instanceof Error) {
					console.log(error.message)
				}
			})
	}
	const logout = async () => {
		await signOut(firebaseAuth)
		setIsloggedIn(false)
		alert('로그아웃 되었습니다.')
	}
	return (
		<AdminAuthContext.Provider value={{ isLoggedIn, login, logout }}>
			{children}
		</AdminAuthContext.Provider>
	)
}
