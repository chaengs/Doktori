import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'

import { AdminAuthContext } from 'context/AdminAuthContext'

interface PrivateRouteType {
	children: React.ReactElement
}

export default function PrivateRoute({ children }: PrivateRouteType): React.ReactElement {
	const { isLoggedIn } = useContext(AdminAuthContext)

	if (!isLoggedIn) {
		return <Navigate to={'/login'} />
	} else {
		return children
	}
}
