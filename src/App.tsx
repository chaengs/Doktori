import React from 'react'
import './App.css'
import { AdminAuthProvider } from 'context/AdminAuthContext'
import Routing from './routes/Routing'

function App() {
	return (
		<AdminAuthProvider>
			<Routing />
		</AdminAuthProvider>
	)
}

export default App
