# Bulletin Board Client

이 프로젝트는 리액트, 익스프레스, MySQL을 사용하여 만든 게시판 웹 애플리케이션입니다.

## 주요 파일

### `index.js`

React 애플리케이션의 진입점 파일입니다. 라우터를 설정하고 애플리케이션을 렌더링합니다.

### `pages/Login.jsx`

로그인 페이지를 담당하는 React 컴포넌트입니다. 사용자의 아이디와 비밀번호를 입력받아 로그인 기능을 수행합니다.

### `pages/Members.jsx`

회원가입 페이지를 담당하는 React 컴포넌트입니다. 사용자의 아이디, 비밀번호, 이메일을 입력받아 회원가입 기능을 수행합니다.

### `pages/PostList.jsx`

게시글 목록과 게시글을 생성, 수정, 삭제하는 페이지를 담당하는 React 컴포넌트입니다. 또한 로그아웃 기능도 제공합니다.

### `component/PostListItem.jsx`

게시글 목록에서 각각의 게시글을 표시하는 컴포넌트입니다.

### `component/Accordion.jsx`

게시글을 펼침/접힘 기능과 게시글 수정, 삭제 기능을 제공하는 컴포넌트입니다.

## 사용된 기술 스택

- **React**: 사용자 인터페이스를 구축하기 위한 자바스크립트 라이브러리입니다.
- **react-router-dom**: React 애플리케이션에서 클라이언트 사이드 라우팅을 제공합니다.
- **Bootstrap**: 웹 디자인 및 모바일 반응성을 위한 프론트엔드 프레임워크로 사용되었습니다.
- **axios**: HTTP 클라이언트 라이브러리로 서버와의 통신에 사용되었습니다.

## 프로젝트 설정 및 실행

1. 프로젝트 폴더로 이동하여 의존성 설치 및 실행:

```bash
npm install
npm start
```

2. 호스트와 포트 설정:

# `package.json` 

"scripts": {
    "start": "HOST=192.168.35.136 PORT=3000 react-scripts start"
    ...
}

### 해당 부분 HOST를 "localhost"로 사용하여 로컬에서 확인 가능
### 모바일에서 확인을 위하여 현재 로컬의 IP를 host로 작성

# `.env`

REACT_APP_SERVER_URL='http://192.168.35.136:4000'

### 서버 IP와 PORT 작성하여 환경변수화

3. 모바일 확인

### 모바일에서 확인을 위하여 pakcage.json에 현재 로컬의 IP를 host로 작성
### 모바일 확인을 위해서는 동일한 네트워크에 존재
### 모바일 브라우저에서 해당 위치에 접속하여 사용