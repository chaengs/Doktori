import React from 'react'
import { Outlet } from 'react-router-dom'

export default function Header() {
	return (
		<>
			<div>Header</div>
			<Outlet />
		</>
	)
}
