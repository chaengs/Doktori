import React, { createContext } from 'react'

import NO_IMAGE from 'library/images/noImage.jpg'

interface NoImageContextType {
	onErrorImage: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void
}

interface ImportChildren {
	children?: React.ReactNode
}

export const NoImageContext = createContext<NoImageContextType>({
	onErrorImage: () => {
		return
	},
})

export function NoImageProvider({ children }: ImportChildren) {
	const onErrorImage = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
		event.currentTarget.src = NO_IMAGE
	}
	return <NoImageContext.Provider value={{ onErrorImage }}>{children}</NoImageContext.Provider>
}
