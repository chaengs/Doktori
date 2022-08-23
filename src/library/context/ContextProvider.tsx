import React, { createContext, useState } from 'react'

export default function ContextProvider({ children }: { children: React.ReactNode }) {
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
	const isLoggedInContext = createContext<boolean>(isLoggedIn)
	return <isLoggedInContext.Provider value={isLoggedIn}>{children}</isLoggedInContext.Provider>
}
