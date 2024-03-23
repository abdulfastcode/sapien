// import React from 'react'
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUserEmail } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { baseUrl } from "../utils/baseUrl";
import OptInput from "./OptInput";
import { toast } from "react-toastify";

const Email = () => {
  const navigate = useNavigate();

  const [showFirstDiv, setShowFirstDiv] = useState(true);
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState();
  const [inputFocus, setInputFocus] = useState(false);

  const [errorMessage, setErrorMessage] = useState(null);

  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  console.log(user);

  let token = localStorage.getItem("auth_token");

  useEffect(() => {
    let timer = null;
    if (isResendDisabled) {
      timer = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime === 0) {
            clearInterval(timer);
            setIsResendDisabled(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => {
      clearInterval(timer);
    };
  }, [isResendDisabled]);

  async function sendMail() {
    console.log(email);
    console.log(JSON.stringify({ email: email }));
    try {
      // /login/send_verification_otp
      let post = await fetch(`${baseUrl}/login/send_verification_otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      });
      let res = await post.json();
      // navigate('/dashboard/agent')
      console.log("res-", res);
      if (res.error) {
        setErrorMessage(res.error);
      } else {
        setErrorMessage(null);
        setIsResendDisabled(true);
        setTimeout(() => {
          setIsResendDisabled(false);
        }, 30000); // Enable Resend button after 30 seconds
        setRemainingTime(30);
      }
    } catch (e) {
      console.error("Error sending mail:", e);
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter"|| e.keyCode === 13) {
      if (showFirstDiv && validEmail) {
        setIsResendDisabled(true);

        setTimeout(() => {
          setIsResendDisabled(false);
          console.log("isResendDisabled", isResendDisabled);
        }, 30000);
        console.log("email valid", email);
        if (token === null) {
          dispatch(addUserEmail({ email: email }));
        }

        setShowFirstDiv(false);
        sendMail();
        // navigate("dashboard/agent");
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
    document.addEventListener("keydown", handleKeyPress);
    let token = localStorage.getItem("auth_token");

    // if (token) {
    //   navigate("/dashboard/agent");
    // } else {
    //   navigate("/");
    // }
    if (token) {
      console.log("auth_token email----->", localStorage.getItem("auth_token"));
      console.log("user not null", user);
      setTimeout(() => {
        navigate("/dashboard/agent");
      }, 3000);
    } else {
      console.log("auth_token email----->", localStorage.getItem("auth_token"));
      console.log("user null", user);
      localStorage.removeItem("auth_token");
      navigate("/");
    }

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [showFirstDiv, email]);
  console.log("isResendDisabled", isResendDisabled);

  const onOtpSubmit = (otpVal) => {
    console.log("optsub", { email: email, opt: otpVal });
    console.log("otpVal", otpVal);
    // /login/verify_otp post email & otp
    fetch(`${baseUrl}/login/verify_otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, otp: otpVal }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("resOpt", res);
        if (res.error) {
          toast.error(res.error);
        }
        if(res.invalidOtp){
          toast.error(res.invalidOtp);
        } 
        if(res.message){
          navigate(res.redirect_url)
        }
      });
  };

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
              disabled={token ?? false}
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
        <div className="flex flex-col text-center items-center gap-[12px]">
          <div>{`Enter OTP send to ${email}`}</div>
          <div>
            {/* <input type="number" name="" id="" /> */}
            <OptInput length={6} onOtpSubmit={onOtpSubmit} />
          </div>
          <div className="text-black text-lg font-normal leading-tight tracking-tight">
            {errorMessage
              ? `${errorMessage}, Recheck your email `
              : " Check your inbox for confirmation email (Check Spam)"}
          </div>
          <div className="">
            <button
              className={`w-[90px] p-[8px] mr-[10px] ${
                isResendDisabled ? "bg-[#381e5061]" : "bg-[#381E50]"
              } text-white bg-indigo-95`}
              onClick={sendMail}
              disabled={isResendDisabled}
            >
              Resend
            </button>
            <button
              className="w-[90px] p-[7px] bg-white border text-indigo-950 border-indigo-950"
              onClick={handleBackButtonClick}
            >
              Back
            </button>
          </div>
          {isResendDisabled && (
            <div className="text-gray-500 text-sm">
              Resend mail in {remainingTime} seconds
            </div>
          )}
        </div>
        {/* verify : /login/verify_otp post email & otp 
        reult  https://sapien-beige.vercel.app/user-info?auth_token={token}
         existing https://sapien-beige.vercel.app/dashboard/agent?auth_token={token}'}) */}
      </div>
    </div>
  );
};

export default Email;
