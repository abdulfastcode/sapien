import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { useDispatch } from "react-redux";
import { removeUser } from "../../utils/userSlice";
import SelectOpt from "./create/agent/SelectOpt";
const DashBoardHeader = ({ user }) => {
  let dispatch = useDispatch();

  let navigate = useNavigate();
  let { pathname } = useLocation();
  console.log("pathname--", pathname);
  useEffect(() => {
    // if (user.email && user.phone) {
    //   console.log("user", user);
    //   navigate("/agent");
    // } else {
    //   console.log("user", user);
    //   navigate("/");
    // }
  }, []);
  return (
    <>
      <div className="px-[25px] sm:px-[45px] py-[20px] md:px-[72px] flex justify-between items-center border-b border-[#433456]">
        <Link to="/">
          <div>
            <img src={logo} alt="logo" />
          </div>
        </Link>
        {user && (
          <div className="group p-[5px] cursor-pointer">
            <div className=" w-8 h-8 relative bg-[#22182A] rounded-full flex justify-center items-center">
              <div className=" w-[11px] cursor-pointer h-6 text-white font-bold">
                {user?.email[0].toUpperCase()}
              </div>
              <div className=" hidden group-hover:block  border bg-white border-[#381E50] absolute top-[102%] right-[10%]">
                <Link to="/dashboard/user-payment">
                  <div
                    className={`text-right ${
                      pathname === "/dashboard/user-payment"
                        ? "bg-[#d7c9ff]"
                        : "bg-white"
                    } border-b border-b-[#381e5021] px-2 hover:bg-[#d7c9ff]  cursor-pointer`}
                    
                  >
                    Payments
                  </div>
                </Link>
                <div
                  className="text-right px-2 hover:bg-[#d7c9ff] cursor-pointer"
                  onClick={() => {
                    dispatch(removeUser());
                  }}
                >
                  SignOut
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DashBoardHeader;
