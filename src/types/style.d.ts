import { Theme } from 'styles/theme'
import { CSSProp } from 'styled-components'

declare module 'styled-components' {
	// eslint-disable-next-line @typescript-eslint/no-empty-interface
	export interface DefaultTheme extends Theme {}
}
