import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Login from "./pages/Login";
import Board from "./pages/Board";
import Members from "./pages/Members";
import PostList from "./pages/PostList";
import reportWebVitals from "./reportWebVitals";
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById("root"));
const router = createBrowserRouter([
  { index: true, path: "/", element: <Board/>, errorElement: <p>Not found</p> },
  { path: "/login", element: <Login/> },
  { path: "/Members", element: <Members/> },
  { path: "/PostList", element: <PostList/>}
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
