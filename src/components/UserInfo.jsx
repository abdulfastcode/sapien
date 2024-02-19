import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUserInfo } from "../utils/slices/userSlice";
// import { updateUserInfo } from './userSlice';

import { baseUrl } from "../utils/baseUrl";
const UserInfo = () => {
  let navigate = useNavigate();
  const [activeDivIndex, setActiveDivIndex] = useState(0);
  const [userInfo, setUserInfo] = useState({
    country_code: "",
    current_usage: [],
    designation: "",
    have_dev_team: false,
    phone: "",
  });
  const dispatch = useDispatch();

  const handleKeyPress = async (e) => {
    if (e.key === "Enter") {
      if (activeDivIndex === 4) {
        dispatch(updateUserInfo(userInfo));
        console.log("User Info:", userInfo); // Print the user info slice values
        const urlParams = new URLSearchParams(window.location.search);
        // const authToken = urlParams.get("auth_token");
        const authToken ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYWJkdWxAZmFzdGNvZGUuYWkifQ.RrtWBbgI2NHxkUJS3iH-sT1AN3iCJDP8PxF3ssJCZjw";
        if (authToken) {
          const apiUrl = `${baseUrl}/login/update_user_info`;
          const requestOptions = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: authToken,
            },
            body: JSON.stringify(userInfo),
          };
          try {
            const response = await fetch(apiUrl, requestOptions);
            if (response.ok) {
              localStorage.setItem("auth_token", authToken);
              navigate("/dashboard/agent");
            } else {
              console.error("Failed to update user info");
            }
          } catch (error) {
            console.error("Error updating user info:", error);
          }
        } else {
          console.error("Auth token not found in URL");
        }
      } else if (activeDivIndex < 4) {
        setActiveDivIndex((prevIndex) => prevIndex + 1);
      }
    } else if (e.key === "Backspace") {
      if (activeDivIndex > 0) {
        setActiveDivIndex((prevIndex) => prevIndex - 1);
      }
    }
  };

  const handleInputChange = (e, key) => {
    let value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    if (key === "current_usage") {
      if (e.target.checked) {
        value = [...userInfo.current_usage, e.target.value];
      } else {
        value = userInfo.current_usage.filter(
          (item) => item !== e.target.value
        );
      }
    }
    setUserInfo((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [activeDivIndex, userInfo, dispatch]);

  const renderDiv = (index, content) => (
    <div
      key={index}
      className={`fixed top-0 left-0 w-full h-full flex items-center justify-center transition-transform duration-500 ${
        activeDivIndex === index ? "" : "transform translate-x-full"
      }`}
    >
      <div className="flex flex-col ml-[39px] items-start gap-[12px]">
        {content}
        <div className="w-[70vw] md:w-[50vw] lg:w-[460px]">
          <div className="flex justify-between">
            <div>
              <span className="text-zinc-500 text-[12px] font-normal leading-[8.80px]">
                Press{" "}
              </span>
              <span className="text-zinc-500 text-[12px] font-bold leading-[8.80px]">
                Enter
              </span>
            </div>
            <div>
              {activeDivIndex > 0 && (
                <button
                  className="w-[70px]  bg-white border text-[#71717a] border-[#e4e4e473 rounded-md]"
                  onClick={() =>
                    setActiveDivIndex((prevIndex) => prevIndex - 1)
                  }
                >
                  Back
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative">
      {renderDiv(
        0,
        <>
          <div className="text-black text-lg font-normal leading-tight tracking-tight">
            Phone
          </div>
          <div>
            <input
              className={`w-[55px] mr-[10px]  h-[50px] p-2 border border-gray-500`}
              type="tel"
              placeholder="+91"
              onChange={(e) => handleInputChange(e, "country_code")}
            />
            <input
              className={`w-[70vw] md:w-[50vw] rounded-sm lg:w-[425px]  h-[50px] p-3 border border-gray-500`}
              type="tel"
              placeholder="123456789"
              onChange={(e) => handleInputChange(e, "phone")}
            />
          </div>
        </>
      )}

      {renderDiv(
        1,
        <>
          <div className="text-black text-lg font-normal leading-tight tracking-tight">
            Full Name
          </div>
          <div>
            <input
              className={`w-[70vw] md:w-[50vw] rounded-sm lg:w-[460px]  h-[50px] p-3 border border-gray-500`}
              type="text"
              placeholder="John Smith"
              onChange={(e) => handleInputChange(e, "full_name")}
            />
          </div>
        </>
      )}

      {renderDiv(
        2,
        <>
          <div className="text-black text-lg font-normal leading-tight tracking-tight">
            Designation
          </div>
          <div>
            <input
              className={`w-[70vw] md:w-[50vw] rounded-sm lg:w-[460px]  h-[50px] p-3 border border-gray-500`}
              type="text"
              placeholder="Data Science"
              onChange={(e) => handleInputChange(e, "designation")}
            />
          </div>
        </>
      )}

      {renderDiv(
        3,
        <>
          <div className="text-black text-lg font-normal leading-tight tracking-tight">
            Which of the following does your company do currently?
          </div>
          <div>
            <div className="flex flex-col gap-[12px]">
              <div className="flex items-center">
                <input
                  id="robo"
                  type="checkbox"
                  value="Robo Calls"
                  className="w-[28px] h-[28px] form-checkbox accent-[#433456] text-[#433456]  bg-gray-100 border-gray-300 rounded focus:ring-[#43345661] dark:focus:ring-[#433456] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  onChange={(e) => handleInputChange(e, "current_usage")}
                />
                <label
                  htmlFor="robo"
                  className="ms-2 w-[70vw] md:w-[50vw] rounded-sm lg:w-[425px] py-[4px] px-[6px] border border-gray-500  text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Robo-Calling
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="outbound-sales"
                  type="checkbox"
                  value="Outbound"
                  className="w-[28px] h-[28px] form-checkbox accent-[#433456] text-[#433456]  bg-gray-100 border-gray-300 rounded focus:ring-[#43345661] dark:focus:ring-[#433456] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  onChange={(e) => handleInputChange(e, "current_usage")}
                />
                <label
                  htmlFor="outbound-sales"
                  className="ms-2 w-[70vw] md:w-[50vw] rounded-sm lg:w-[425px] py-[4px] px-[6px] border border-gray-500  text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Outbound Sales Calls
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="inbound-sales"
                  type="checkbox"
                  value="Inbound"
                  className="w-[28px] h-[28px] form-checkbox accent-[#433456] text-[#433456]  bg-gray-100 border-gray-300 rounded focus:ring-[#43345661] dark:focus:ring-[#433456] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  onChange={(e) => handleInputChange(e, "current_usage")}
                />
                <label
                  htmlFor="inbound-sales"
                  className="ms-2 w-[70vw] md:w-[50vw] rounded-sm lg:w-[425px] py-[4px] px-[6px] border border-gray-500  text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Inbound Sales Calls
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="cus-support"
                  type="checkbox"
                  value="Support"
                  className="w-[28px] h-[28px] form-checkbox accent-[#433456] text-[#433456]  bg-gray-100 border-gray-300 rounded focus:ring-[#43345661] dark:focus:ring-[#433456] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  onChange={(e) => handleInputChange(e, "current_usage")}
                />
                <label
                  htmlFor="cus-support"
                  className="ms-2 w-[70vw] md:w-[50vw] rounded-sm lg:w-[425px] py-[4px] px-[6px] border border-gray-500  text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Customer Support Calls
                </label>
              </div>
            </div>
          </div>
        </>
      )}

      {renderDiv(
        4,
        <>
          <div className="text-black text-lg font-normal leading-tight tracking-tight">
            Do your company have a dev team?
          </div>
          <div>
            <div className="flex flex-col gap-[12px]">
              <div className="flex items-center">
                <input
                  id="dev-team-yes"
                  type="checkbox"
                  name="dev-team"
                  value="YES"
                  className="w-[28px] h-[28px] form-checkbox accent-[#433456] text-[#433456]  bg-gray-100 border-gray-300 rounded focus:ring-[#43345661] dark:focus:ring-[#433456] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  onChange={(e) => handleInputChange(e, "have_dev_team")}
                />
                <label
                  htmlFor="dev-team-yes"
                  className="ms-2 w-[70vw] md:w-[50vw] rounded-sm lg:w-[425px] py-[4px] px-[6px] border border-gray-500  text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  YES
                </label>
              </div>
              <div className="flex items-center">
                <input
                  name="dev-team"
                  id="dev-team-no"
                  type="checkbox"
                  value="NO"
                  className="w-[28px] h-[28px] form-checkbox accent-[#433456] text-[#433456]  bg-gray-100 border-gray-300 rounded focus:ring-[#43345661] dark:focus:ring-[#433456] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  onChange={(e) => handleInputChange(e, "have_dev_team")}
                />
                <label
                  htmlFor="dev-team-no"
                  className="ms-2 w-[70vw] md:w-[50vw] rounded-sm lg:w-[425px] py-[4px] px-[6px] border border-gray-500  text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  NO
                </label>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserInfo;
