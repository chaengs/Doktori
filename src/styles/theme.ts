import media from './media'

const color = {
	yellowgreen: '#b8c97c',
	darkerMainColor: '#a0af67',
	green: '#5a6829',
	brown: '#895737',
	ivory: '#fefae0',
	lightYellowgreen: '#e9edc9',
	orange: '#f48c06',
}

const fontSize = {
	mobileTitle: '18px',
	mobileDesc: '16px',
	desktopTitle: '30px',
	desktopDesc: '20px',
	desktopBookTitle: '18px',
	desktopBookDesc: '15px',
	large: '35px',
	middle: '30px',
}

export const theme = {
	media,
	color,
	fontSize,
}

export type Theme = typeof theme
