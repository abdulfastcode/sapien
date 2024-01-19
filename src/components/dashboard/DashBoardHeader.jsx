import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { useDispatch } from "react-redux";
import { removeUser } from "../../utils/userSlice";
const DashBoardHeader = ({ user }) => {
  console.log(user);
  const navigate = useNavigate();
  let dispatch = useDispatch();
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
    <div className="px-[25px] sm:px-[45px] py-[20px] md:px-[72px] flex justify-between items-center border-b border-[#433456]">
      <Link to="/">
        <div>
          <img src={logo} alt="logo" />
        </div>
      </Link>
      {user && (
        <div className="w-8 h-8 bg-[#22182A] rounded-full flex justify-center items-center">
          <div
            onClick={() => {
              dispatch(removeUser());
            }}
            className="w-[11px] h-6 text-white font-bold"
          >
            {user?.email[0].toUpperCase()}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashBoardHeader;
