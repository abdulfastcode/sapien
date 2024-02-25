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
import Audiences from "./components/dashboard/Audiences.jsx";
import Campaign from "./components/dashboard/Campaign.jsx";
import CreateCampaign from "./components/dashboard/create/campaign/CreateCampaign.jsx";
import CreateAgent from "./components/dashboard/create/agent/CreateAgent.jsx";
import CreateAudience from "./components/dashboard/create/audiences/CreateAudience.jsx";
import CreateAudienceTable from "./components/dashboard/create/audiences/CreateAudienceTable.jsx";
import Payment from "./components/dashboard/Payment.jsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        path: "/dashboard/user-payment",
        element: <Payment/>
      },
      {
        path: "/dashboard/agent",
        element: <Agent />,
      },
      {
        path: "/dashboard/audience",
        element: <Audiences />,
      },
      {
        path: "/dashboard/campaign",
        element: <Campaign />,
      },
      {
        path: "/dashboard/campaign/create",
        element: <CreateCampaign />,
      },
      {
        path: "/dashboard/agent/create",
        element: <CreateAgent />,
      },
      {
        path: "/dashboard/audience/create",
        element: <CreateAudience />,
      },
      {
        path: "/dashboard/audience/create/create/:fileType",
        element: <CreateAudienceTable/>
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Provider store={store}>
    <RouterProvider router={router}></RouterProvider>
    <ToastContainer />
  </Provider>
  // </React.StrictMode>,
);
