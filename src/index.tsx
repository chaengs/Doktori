import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import GlobalStyles from './styles/GlobalStyles'
import GlobalFonts from './styles/fonts'
import { ThemeProvider } from 'styled-components'
import { theme } from 'styles/theme'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<GlobalStyles />
			<GlobalFonts />
			<App />
		</ThemeProvider>
	</React.StrictMode>,
)
