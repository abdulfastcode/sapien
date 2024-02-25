import React, { useEffect } from "react";
import DashBoardHeader from "./DashBoardHeader";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import LeftNavBar from "./LeftNavBar";

const Dashbord = () => {
  const navigate = useNavigate();
  const jsonFileData = useSelector((state) => state.fileLoader.json);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    // if (!jsonFileData) {
    //   navigate("/dashboard/audience");
    // }
    // if (user) {
    //   console.log("user not null", user);

    //   navigate("/dashboard/agent");
    // } else {
    //   // console.log("user null", user);
    //   navigate("/");

    // }
    // checking for existing user 
    const urlParams = new URLSearchParams(window.location.search);
    console.log("urlParams---", urlParams);
    const authToken = urlParams.get("auth_token");
    if (authToken) {
      localStorage.setItem("auth_token", authToken);
    }

    let token = localStorage.getItem("auth_token");

    if (token) {
      console.log("user not null", user);
      navigate("/dashboard/agent");
    } else {
      console.log("user null", user);
      navigate("/");
    }

    // if (jsonFileData === null) {
    //   navigate("/dashboard/audience");
    // }
    
  }, [user]);
  return (
    <>
      <DashBoardHeader user={user} />
      <div className="flex flex-col lg:flex-row">
        <LeftNavBar />
        <Outlet />
      </div>
    </>
  );
};

export default Dashbord;
