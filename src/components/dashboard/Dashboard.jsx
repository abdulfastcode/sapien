import React from "react";
import DashBoardHeader from "./DashBoardHeader";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

const Dashbord = () => {
  const user = useSelector((state) => state.user);
  return (
    <>
      <DashBoardHeader user={user} />
      <Outlet/>
    </>
  );
};

export default Dashbord;
