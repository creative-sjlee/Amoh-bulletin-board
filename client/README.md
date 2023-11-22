
# Bulletin Board Client
This project is a bulletin board web application created using React, Express, and MySQL.

## Key Files
### `index.js`
The entry point file for the React application. It sets up the router and renders the application.

### `pages/Login.jsx`
A React component responsible for the login page. It takes user input for the username and password to perform the login functionality.

### `pages/Members.jsx`
A React component handling the registration page. It takes user input for the username, password, and email to perform the registration functionality.

### `pages/PostList.jsx`
A React component responsible for displaying the list of posts and handling the creation, modification, and deletion of posts. It also provides a logout feature.

### `pages/Board.jsx`
A React component responsible for displaying the list of posts. It also provides a login feature.

### `component/PostListItem.jsx`
A component that displays each post in the post list.

### `component/Accordion.jsx`
A component that provides the functionality to expand/collapse posts and offers the ability to edit and delete posts.

## Technology Stack Used

**React**: A JavaScript library for building user interfaces.
**react-router-dom**: Provides client-side routing in React applications.
**Bootstrap**: A frontend framework used for web design and mobile responsiveness.
**axios**: An HTTP client library used for communication with the server.

## Project Setup and Execution
1. Navigate to the project folder, install dependencies, and run:

```bash
Copy code
npm install
npm start
```

2. Configure the host and port:
`package.json`

"scripts": {
"start": "HOST=192.168.35.136 PORT=3000 react-scripts start"
...
}
or
"scripts": {
"start": "react-scripts start"
...
}

### Set HOST to "localhost" for local testing
### For mobile testing, use the current local IP as the host
### Ensure that both devices are on the same network for mobile testing

# `.env

REACT_APP_SERVER_URL='http://192.168.35.136:4000'

### Set the server IP and PORT as environment variables

3. Mobile Testing
### Set the host to the current local IP in package.json for local testing
### For mobile testing, both devices must be on the same network Access the application from the mobile browser using the specified location
(Note: IP addresses and ports are examples, please replace them with your actual server and network details.)