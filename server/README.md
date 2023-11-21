# Bulletin Board Server

이 프로젝트는 Express 및 MySQL을 사용하여 만든 게시판 웹 애플리케이션의 서버 부분입니다.

## 주요 파일

### `app.js`

Express 애플리케이션의 진입점 파일입니다. 라우팅 및 MySQL 연결 등 서버의 주요 기능을 설정합니다.

### MySQL 데이터베이스 연결 정보

MySQL 데이터베이스에 연결하기 위한 정보가 `app.js` 파일에 하드코딩되어 있습니다. 필요에 따라 수정하세요.

```bash
host: "localhost",
port: "3306",
user: "root",
password: "*******",
database: "boardsystem"
```

#### DB Table 정보

## `SQL`
CREATE DATABASE `boardsystem` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

# `board`
id(PK),title,content,images1,images2,images3

## `SQL`
CREATE TABLE `board` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `images1` varchar(255) DEFAULT NULL,
  `images2` varchar(255) DEFAULT NULL,
  `images3` varchar(255) DEFAULT NULL,
  `boardcol` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

# `member`
username(PK),password,email

## `SQL`
CREATE TABLE `member` (
  `username` varchar(45) NOT NULL,
  `password` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

### 라우트

- `/member` (POST): 새로운 회원을 추가합니다.
- `/login` (POST): 사용자 로그인을 처리합니다.
- `/posts`: 모든 게시글을 반환합니다.
- `/posts` (POST): 새로운 게시글을 추가합니다.
- `/posts/:id` (PUT): 특정 ID의 게시글을 수정합니다.
- `/posts/:id` (DELETE): 특정 ID의 게시글을 삭제합니다.

### 이미지 업로드

게시글에 이미지를 업로드하면 `uploads` 폴더에 저장됩니다.

## 사용된 라이브러리

- **Express**: Node.js 웹 애플리케이션을 위한 웹 프레임워크입니다.
- **cors**: CORS (Cross-Origin Resource Sharing)를 활성화하기 위한 미들웨어입니다.
- **mysql2**: MySQL 데이터베이스와의 연결을 위한 드라이버입니다.
- **multer**: 파일 업로드를 위한 미들웨어입니다.
- **body-parser**: HTTP 요청 본문을 파싱하기 위한 미들웨어입니다.
- **fs**: 파일 시스템과 상호작용하기 위한 Node.js 모듈입니다.

## 프로젝트 설정 및 실행

1. 프로젝트 폴더로 이동하여 의존성 설치 및 실행:

```bash
npm install
node app.js
```

2. 호스트와 포트 설정:

# `.env`

## SERVER
REACT_APP_LOCALHOST='192.168.35.136'
REACT_APP_LOCALHOST_PORT='4000'

## DB
REACT_APP_DB= "localhost",
REACT_APP_DB_PORT= "3306",
REACT_APP_DB_USER= "root",
REACT_APP_DB_PW= "****",
REACT_APP_DB_SCHEMA= "boardsystem"

### 서버/DB IP와 PORT 및 로그인 정보 작성하여 환경변수화
### PW의 "****"에는 비밀번호 입력