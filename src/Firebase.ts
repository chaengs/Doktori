import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getFirestore } from '@firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
	storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
	appId: process.env.REACT_APP_FIREBASE_APPID,
	measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID,
}

console.log(process.env.REACT_APP_FIREBASE_APIKEY)

// const firebaseConfig = {
// 	apiKey: 'AIzaSyC_ufVTHBVa_5Yl6WPzL9n1XvMCIfLzX_k',
// 	authDomain: 'bookdive-718c5.firebaseapp.com',
// 	projectId: 'bookdive-718c5',
// 	storageBucket: 'bookdive-718c5.appspot.com',
// 	messagingSenderId: '508070106646',
// 	appId: '1:508070106646:web:08432ebcd3227b86958737',
// 	measurementId: 'G-T3W7MXH365',
// }

export const firebaseApp = initializeApp(firebaseConfig)
export const firebaseDB = getFirestore(firebaseApp)
export const firebaseAuth = getAuth(firebaseApp)
