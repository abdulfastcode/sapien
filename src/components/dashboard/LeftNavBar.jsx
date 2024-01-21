// import React from "react";
import { Link, useLocation } from "react-router-dom";

const LeftNavBar = () => {
  let { pathname } = useLocation();

  

  return (
    <div className="grid grid-cols-3 lg:w-[10%] lg:flex lg:flex-col justify-around lg:justify-normal border border-b-[#433456] lg:border-b-[#fff] lg:border-r-[#433456]  lg:h-[calc(100vh-86px)]">
      <Link to="dashboard/campaign">
        <div
          className={` ${
            pathname === "/dashboard/campaign/create" ||
            pathname === "/dashboard/campaign"
              ? "bg-[#381E50] text-white"
              : "text-[#381E50] bg-white"
          } text-base font-bold text-center  py-[19px] px-[9px] leading-tight tracking-tight`}
        >
          Campaign
        </div>
      </Link>

      <Link to="dashboard/audiences">
        <div
          className={` ${
            pathname === "/dashboard/audiences" ||
            pathname === "/dashboard/audiences/create"
              ? "bg-[#381E50] text-white"
              : "text-[#381E50] bg-white"
          } text-base font-bold text-center py-[19px] px-[9px] leading-tight tracking-tight`}
        >
          Audiences
        </div>
      </Link>
      <Link to="dashboard/agent">
        <div
          className={` ${
            pathname === "/dashboard/agent" ||
            pathname === "/dashboard/agent/create"
              ? "bg-[#381E50] text-white"
              : "text-[#381E50] bg-white"
          } text-base font-bold text-center py-[19px] px-[9px] leading-tight tracking-tight`}
        >
          Agents
        </div>
      </Link>
    </div>
  );
};

export default LeftNavBar;
