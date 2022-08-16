import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import GlobalStyles from './styles/globalStyles'
import firebase from './Firebase'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
	<React.StrictMode>
		<GlobalStyles />
		<App />
	</React.StrictMode>,
)
