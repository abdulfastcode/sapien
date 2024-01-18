// import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./utils/store.js";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Email from "./components/Email.jsx";
import Agent from "./components/dashboard/Agent.jsx";
import UserInfo from "./components/UserInfo.jsx";
import Dashboard from "./components/dashboard/Dashboard.jsx";
import DashBoardHeader from "./components/dashboard/DashBoardHeader.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Email />,
      },
      {
        path: "/user-info",
        element: <UserInfo />,
      },
    ],
  },
  {
    paths: "/dashbord",
    element: <Dashboard />,
    children: [
      {
        path: "/dashboard/agent", element: <Agent /> 
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Provider store={store}>
    <RouterProvider router={router}></RouterProvider>
  </Provider>
  // </React.StrictMode>,
);
