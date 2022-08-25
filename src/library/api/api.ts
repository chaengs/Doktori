import axios from 'axios'

type params = {
	query: string
}

const KAKAO_API_KEY = 'KakaoAK 51dd390526813a59eae7dd1b452228b9'

const Kakao = axios.create({
	baseURL: 'https://dapi.kakao.com',
	headers: {
		Authorization: KAKAO_API_KEY,
	},
})

export const bookSearch = (params: params) => {
	return Kakao.get('/v3/search/book', { params })
}
