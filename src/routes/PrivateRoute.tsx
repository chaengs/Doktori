import React from 'react'
import { Navigate } from 'react-router-dom'

interface PrivateRouteType {
	children: React.ReactElement
	auth: boolean
}

export default function PrivateRoute({ auth, children }: PrivateRouteType): React.ReactElement {
	if (auth) {
		return children
	} else {
		alert('로그인이 필요합니다.')
		return <Navigate to={'/login'} />
	}
}
