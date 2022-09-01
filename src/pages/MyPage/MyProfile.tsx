import React from 'react'
import { useLocation } from 'react-router-dom'

export default function MyProfile() {
	const { state } = useLocation()
	const { user } = state as any
	return (
		<div>
			<h1>회원정보</h1>
			<p>닉네임 : {user.nickname}</p>
			<p>이메일 : {user.email}</p>
			<p>비밀번호 변경하기</p>
		</div>
	)
}
