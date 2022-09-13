<img src="https://user-images.githubusercontent.com/73277502/188501980-fdfd3b3a-261a-4a50-bdec-ad68a40f3521.jpg" style="width:400px;"/>


<h1>독토리</h1>
책의 감상을 다른 독자들과 공유할 수 있는 서비스입니다.  
  
<h2><a href="https://doktori-1eb0a.web.app">독토리 살펴보기</a></h2>

<h3>🌰Skills</h3>

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white)

<h3>🌰개발과정</h3>

### 1. 반응형 웹 디자인을 적용했습니다.(데스크탑, 모바일)

### 2. 독후감 수정과 삭제 기능
- 독후감을 새로 작성할 때와 수정할 때의 포맷은 동일하기에 컴포넌트를 재사용 할 수 없을까 고민했습니다.
- 독후감을 작성할 수 있는 `ReviewEditor` 컴포넌트를 `CreateReviewPage`와 `EditReviewPage`에서 동일하게 사용하되 `isEdit`이라는 프롭으로 ‘새롭게 작성'과 ‘수정' 여부를 구분하였습니다.
- ⬇️ `CreateReviewPage`에서는 `isEdit={false}`로 전달하고 독후감을 DB에 새롭게 저장하기 위해 로그인한 user의 정보와 책의 정보를 전달합니다.
```
// CreateReviewPage
<EditorContainer>
		<ReviewEditor isEdit={false} user={user} bookData={state} />
</EditorContainer>
```
- ⬇️ EditReviewPage에서는 isEdit={true}와 기존 독후감의 데이터를 originData라는 이름으로 전달합니다.
```
// EditReviewPage
<EditorContainer>
		<ReviewEditor isEdit={true} originData={originData} reviewId={reviewId} />
</EditorContainer>
```
- ⬇️ isEdit 값에 따라 책의 정보, 버튼을 클릭했을 때 동작하는 함수, 버튼 내 문구가 달라집니다.
```
		<ReviewContainer>
			<BookContainer bookInfo={isEdit ? originData : bookData} />
			<ReviewEditorContainer>
				<ScoreBox setScore={setScore} score={score} />
				<DateBox date={date} onChange={changeDateHandler} />
				<ContentInput
					placeholder='독서는 즐거우셨나요? 여러분의 감상을 적어주세요. (10자 이상, 1500자 이하)'
					onChange={(event) => {
						setContent(event.target.value)
					}}
					value={content}
				/>
				<SubmitButton
					onClick={isEdit ? editHandler : createHandler}
					disabled={buttonActive}
					className={buttonActive ? 'buttonOff' : 'buttonOn'}
				>
					{isEdit ? '수정완료' : '작성완료'}
				</SubmitButton>
			</ReviewEditorContainer>
		</ReviewContainer>
 ```

### 3. 도서 상세 정보 페이지
- ⬇️ 수정 전
```
//다른 컴포넌트에서 BookDetailPage로 데이터를 전달함

const moveToDetailPage = () => {
		navigate('/bookdetail', {
			state: {
				thumbnail,
				title,
				authors,
				contents,
				datetime,
				publisher,
				isbn,
			},
		})
	}

// BookDetailPage(책 상세 정보 페이지)에서 데이터 받음

const { state } = useLocation()
const { thumbnail, title, authors, contents, datetime, publisher, isbn } = state as BookInfoType
```
- 처음에는 useNavigate()와 useLocation()을 사용해 사용자가 클릭한 책의 정보를 모두 전송 → 받는 것으로 도서 상세 정보를 표시했습니다.
- 타 독자의 독후감 정보 페이지에서도 도서 사진이나 제목을 클릭하여 도서의 정보를 볼 수 있도록 수정하던 중 문제를 발견했습니다.

![image](https://user-images.githubusercontent.com/73277502/189903215-3f8e6755-833c-4699-951e-5f94994e2df3.png)

- ReviewDetailPage는 도서의 일부 정보만을 갖고 있었기에 BookDetailPage는 원하는 데이터를 받을 수 없었습니다.
    - 타 컴포넌트에게 data를 100% 의존하는 방식은 안정적이지 않으며, 컴포넌트의 재사용성도 떨어진다는 것을 배웠습니다.

- ⬇️ 수정 후
```
const { state } = useLocation()
const { title } = state as BookInfoType

// 제목(title)을 받아와 도서 정보를 검색함
const apiResult = useSearchBook(title, 1)
useEffect(() => {
	apiResult && setBookInfo(apiResult[0])
}, [apiResult])
```
- 그리하여 도서 제목(title) 하나만을 받아와 다시 새롭게 API에 데이터를 요청하는 방식으로 수정하여 데이터 요청이 원활해졌고 재사용하기가 용이해졌습니다.

### 4. Custom Hook
- DB에 데이터를 요청하는 경우가 자주 있기에 DB에 데이터를 요청하는 useSearchDB 커스텀 훅을 만들었습니다.
<a></a>

### 5. 렌더링 최적화
- `ReviewEditor`의 구성요소는 별도의 컴포넌트 분리가 없었습니다. 때문에 값이 하나만 바뀌어도 모든 요소가 리렌더링이 되었습니다.
- 각각의 요소를 컴포넌트로 분리하였고 prop의 state가 변하지 않으면 렌더링 되지 않도록 `React.memo`를 사용하였습니다.
![image](https://user-images.githubusercontent.com/73277502/189903598-8737b8bc-0087-457f-a821-03a845de8c49.png)
- 완독 날짜를 선택하는 DateBox는 부모컴포넌트(ReviewEditor)에서 changeDateHandler라는 함수를 프롭으로 받기 때문에 useCallback으로 함수를 메모이제이션하도록 수정했습니다.
```
const changeDateHandler = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		setDate(event.target.value)
	}, [])
```

### 6. 도서의 표지 사진이 없을 경우 대체 이미지가 나오도록 처리
- 도서 검색 API는 카카오의 검색 API를 사용했는데 간혹 표지가 제공되지 않는 도서가 있습니다.
- 대체 이미지를 띄우도록 하는 함수를 Context API를 이용해 여러 컴포넌트가 쉽게 접근하도록 하였습니다.
    - 도서 표지를 보여줘야하는 컴포넌트마다 코드를 반복적으로 작성할 필요가 없게 되었습니다
![image](https://user-images.githubusercontent.com/73277502/189903794-6421b33f-5c6c-4550-8d67-48776627245e.png)


<h3>🌰프로젝트 실행 방법</h3>
<p>1. 프로젝트 클론</p>
  
``
https://github.com/chaengs/Doktori.git
``
  
<p>2. 패키지 설치</p>
  
`` npm install ``
  
<p>3. 프로젝트 실행</p>
  
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
