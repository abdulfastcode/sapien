// import React from 'react'
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUserDetails } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Email = () => {
  const [showFirstDiv, setShowFirstDiv] = useState(true);
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState();
  const [inputFocus, setInputFocus] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const navigate = useNavigate();

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (showFirstDiv && validEmail) {
        console.log("email valid", email);
        dispatch(addUserDetails({ email: email }));
        setShowFirstDiv(false);
        // navigate("/agent");
      } else if (!showFirstDiv) {
        setShowFirstDiv(true);
      }
    }
  };

  const validateEmail = (input) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(input)) {
      setInputFocus(false);
      setValidEmail(true);
    } else {
      setInputFocus(true);
      setValidEmail(false);
    }
  };

  const handleInput = (e) => {
    setEmail(e.target.value);
    validateEmail(e.target.value);
  };

  const handleBackButtonClick = () => {
    setShowFirstDiv(true);
  };

  useEffect(() => {
    if (user.email && user.phone) {
      console.log("user", user);
      // navigate("/agent");
    } else {
      console.log("user", user);
      navigate("/");
    }
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [showFirstDiv, email]);

  return (
    <div className="relative">
      <div
        className={`fixed top-0 left-0 w-full h-full flex items-center justify-center transition-transform duration-500 ${
          showFirstDiv ? "" : "transform -translate-x-full"
        }`}
      >
        <div className="flex flex-col items-start gap-[12px]">
          <div className="text-black text-lg font-normal leading-tight tracking-tight">
            Official Email
          </div>
          <div>
            <input
              className={`w-[70vw] md:w-[50vw] rounded-sm lg:w-[460px]  h-[50px] p-3 border 
              ${inputFocus ? "border-red-600" : "border-gray-500"} 
              ${
                validEmail
                  ? "focus:outline-none focus:ring text-[#5e516f] focus:ring-[#5e516f]"
                  : "focus:outline-none focus:ring text-pink-900 focus:ring-pink-600"
              }`}
              type="email"
              placeholder="john@smallest.ai"
              value={email}
              onFocus={() =>
                setValidEmail ? setInputFocus(false) : setInputFocus(true)
              }
              onChange={handleInput}
              //   onFocus={handleInputFocus}
              //   onBlur={handleInputBlur}
            />
          </div>
          <div>
            {email.length == 0 ? (
              <span className="text-zinc-500 text-[12px] font-bold leading-[8.80px]">
                Enter Email Address
              </span>
            ) : validEmail ? (
              <div>
                <span className="text-zinc-500 text-[12px] font-normal  leading-[8.80px]">
                  Press{" "}
                </span>
                <span className="text-zinc-500 text-[12px] font-bold leading-[8.80px]">
                  Enter
                </span>
              </div>
            ) : (
              <span className="text-zinc-500 text-[12px] font-normal  leading-[8.80px]">
                Invalid Email
              </span>
            )}
          </div>
        </div>
      </div>
      <div
        className={`fixed top-0 left-0 w-full h-full flex items-center justify-center transition-transform duration-500 ${
          showFirstDiv ? "transform translate-x-full" : ""
        }`}
      >
        <div className="flex flex-col items-start gap-[12px]">
          <div className="text-black text-lg font-normal leading-tight tracking-tight">
            Check your inbox for confirmation email
          </div>
          <div>
            <button className="w-[90px] p-[8px] mr-[10px] text-white bg-indigo-950">
              Resend
            </button>
            <button
              className="w-[90px] p-[7px] bg-white border text-indigo-950 border-indigo-950"
              onClick={handleBackButtonClick}
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Email;

