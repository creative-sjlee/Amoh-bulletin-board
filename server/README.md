# Bulletin Board Server

This project represents the server portion of a bulletin board web application created using Express and MySQL.

## Key Files

### `app.js`

The entry point file for the Express application. It configures the main server functionalities such as routing and MySQL connection.

## MySQL Database Connection Information

Connection information for the MySQL database is hardcoded in the `app.js` file. Modify it as needed.

```bash
host: "localhost",
port: "3306",
user: "root",
password: "*******",
database: "boardsystem"
```

### DB Table Information

## `SQL`
CREATE DATABASE `boardsystem` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

# `board`
id(PK), title, content, images1, images2, images3

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
username(PK), password, email

## `SQL`
CREATE TABLE `member` (
  `username` varchar(45) NOT NULL,
  `password` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

## `admin insert`
INSERT INTO `boardsystem`.`member`
VALUES ("admin", "1234", "1@2.3");

## Routes

- `/member` (POST): Adds a new member.
- `/login` (POST): Handles user login.
- `/posts`: Returns all posts.
- `/posts` (POST): Adds a new post.
- `/posts/:id` (PUT): Modifies a post with a specific ID.
- `/posts/:id` (DELETE): Deletes a post.

## Image Upload

When uploading images for a post, they are stored in the `uploads` folder.

## Used Libraries

- **Express**: A web framework for Node.js applications.
- **cors**: Middleware to enable CORS (Cross-Origin Resource Sharing).
- **mysql2**: MySQL driver for database connection.
- **multer**: Middleware for file uploads.
- **body-parser**: Middleware for parsing HTTP request bodies.
- **fs**: Node.js module for interacting with the file system.

## Project Setup and Execution

1. Navigate to the project folder, install dependencies, and run:

```bash
npm install
node app.js
```

2. Configure host and port:

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

### Set server/DB IP and PORT, and login information as environment ### variables. Enter the password in place of "****" in PW.