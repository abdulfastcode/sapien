import React, { useEffect } from "react";
import DashBoardHeader from "./DashBoardHeader";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Dashbord = () => {
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);
 
  useEffect(()=>{
    if (user) {
      console.log("user not null", user);
      
        navigate("/dashboard/agent");
     
    } else {
      console.log("user null", user);
      navigate("/");
    }
  },[])
  return (
    <>
      <DashBoardHeader user={user} />
      <Outlet/>
    </>
  );
};

export default Dashbord;
