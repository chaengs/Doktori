import { css, CSSProp } from 'styled-components'

type MediaQueryType = {
	mobile: string
	desktop: string
}

const size: MediaQueryType = {
	mobile: '767px',
	desktop: '1024px',
}

//미디어 템플릿
type BackQuoteArgs = string[]

const media = {
	mobile: (literals: TemplateStringsArray, ...args: BackQuoteArgs): CSSProp => css`
		@media only screen and (max-width: ${size.mobile}) {
			${css(literals, ...args)}
		}
	`,
	desktop: (literals: TemplateStringsArray, ...args: BackQuoteArgs): CSSProp => css`
		@media only screen and (min-width: ${size.desktop}) {
			${css(literals, ...args)}
		}
	`,
} as Record<keyof typeof size, (literals: TemplateStringsArray, ...args: BackQuoteArgs) => CSSProp>

export default media
