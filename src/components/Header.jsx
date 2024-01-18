// import React from "react";

import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";

const Header = () => {
  // const user = useSelector((state) => state.user.userDetails);
  return (
    <div className="px-[25px] sm:px-[45px] py-[31px] md:px-[72px] flex justify-between items-center">
      <Link to="/">
        <div>
          <img src={logo} alt="logo" />
        </div>
      </Link>
    </div>
  );
};

export default Header;
