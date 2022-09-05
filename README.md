<img src="https://user-images.githubusercontent.com/73277502/188501980-fdfd3b3a-261a-4a50-bdec-ad68a40f3521.jpg" style="width:400px;"/>


<h1>독토리</h1>
책의 감상을 다른 독자들과 공유할 수 있는 서비스입니다.  
  
<a href="https://doktori-1eb0a.web.app">🌰독토리 살펴보기</a>

<h3>Skills</h3>

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white)

<h3>프로젝트 실행 방법</h3>
1. 프로젝트 클론. 
  
2. 패키지 설치
`` npm install ``

3. 프로젝트 실행
`` npm start ``

<h3>프로젝트 구조</h3>
  
```
├── public/
│   ├── favicon.ico
│   ├── index.html
│   ├── robots.txt
│   └── thumbnail.jpg
├── src/
│   ├── App.css
│   ├── App.tsx
│   ├── components/
│   │   ├── BookCard.tsx
│   │   ├── Header.tsx
│   │   ├── Loading.tsx
│   │   └── ReviewCard.tsx
│   ├── context/
│   │   ├── AdminAuthContext.tsx
│   │   └── NoImageContext.tsx
│   ├── firebase-config.ts
│   ├── hooks/
│   │   ├── useOrderReview.tsx
│   │   ├── useSearchBook.tsx
│   │   ├── useSearchDB.tsx
│   │   └── useSearchReviewById.tsx
│   ├── index.css
│   ├── index.tsx
│   ├── library/
│   │   ├── api/
│   │   │   └── api.ts
│   │   └── images/
│   │       ├── doctori_logo.png
│   │       ├── noImage.jpg
│   │       └── reading.svg
│   ├── pages/
│   │   ├── DetailPage/
│   │   │   ├── BookDetailPage.tsx
│   │   │   ├── ReviewDetailPage.tsx
│   │   │   └── components/
│   │   ├── LoginPage/
│   │   │   └── LoginPage.tsx
│   │   ├── MainPage/
│   │   │   ├── MainPage.tsx
│   │   │   └── components/
│   │   ├── MyPage/
│   │   │   ├── MyBookShelf.tsx
│   │   │   ├── MyPage.tsx
│   │   │   └── MyProfile.tsx
│   │   ├── RegisterPage/
│   │   │   └── RegisterPage.tsx
│   │   ├── SearchPage/
│   │   │   └── SearchPage.tsx
│   │   └── WriteReviewPage/
│   │       ├── CreateReviewPage.tsx
│   │       ├── EditReviewPage.tsx
│   │       └── components/
│   ├── routes/
│   │   ├── Path.ts
│   │   ├── PrivateRoute.tsx
│   │   └── Routing.tsx
│   ├── styles/
│   │   ├── ButtonStyle.tsx
│   │   ├── FormStyle.tsx
│   │   ├── InputStyle.tsx
│   │   ├── fonts.ts
│   │   ├── globalStyles.ts
│   │   ├── media.ts
│   │   └── theme.ts
│   ├── types/
│   │   ├── bookType.d.ts
│   │   ├── imageType.d.ts
│   │   ├── review.d.ts
│   │   ├── style.d.ts
│   │   └── userType.d.ts
│   └── util/
│       ├── checkRegExp.ts
│       └── getStringDate.ts
```
