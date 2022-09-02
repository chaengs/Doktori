import React from 'react'
import './App.css'
import { AdminAuthProvider } from 'context/AdminAuthContext'
import Routing from './routes/Routing'
import { NoImageProvider } from 'context/NoImageContext'

function App() {
	return (
		<AdminAuthProvider>
			<NoImageProvider>
				<Routing />
			</NoImageProvider>
		</AdminAuthProvider>
	)
}

export default App
