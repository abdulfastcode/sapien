import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUserInfo } from "../utils/slices/userSlice";
// import { updateUserInfo } from './userSlice';
import rightIcon from "../assets/icons/rightIcon.svg";
import { baseUrl } from "../utils/baseUrl";
import { addUserEmail } from "../utils/userSlice";
import { toast } from "react-toastify";
const UserInfo = () => {
  let navigate = useNavigate();

  const user = useSelector((state) => state.user);
  const [valueSel, setValueSel] = useState("+91");

  // useEffect(() => {
  //   localStorage.removeItem("auth_token");
  // }, []);
  const [activeDivIndex, setActiveDivIndex] = useState(0);
  const [userInfo, setUserInfo] = useState({
    country_code: "+91",
    current_usage: [],
    designation: "",
    has_dev_team: null,
    full_name:"",
    phone: "",
  });
  const dispatch = useDispatch();

  const handleKeyPress = async (e) => {
    if (e.key === "Enter" || e.keyCode == 13 || e.target.id === "arrow-right") {
      console.log("User Info:", userInfo); // Print the user info slice values

      console.log("entered!!!!");
      if (activeDivIndex === 4) {
        dispatch(updateUserInfo(userInfo));
        console.log("User Info:", userInfo); // Print the user info slice values
        const urlParams = new URLSearchParams(window.location.search);
        console.log("urlParams---", urlParams);
        const authToken = urlParams.get("auth_token");
        // const authToken =
        //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYWJkdWxAZmFzdGNvZGUuYWkifQ.dSNnYNrD6WRTzV-weQeJwj0RaOrUXhq3jEqVVU2r1cA";
        if (authToken) {
          const apiUrl = `${baseUrl}/login/update_user_info`;
          const requestOptions = {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify(userInfo),
          };
          try {
            const response = await fetch(apiUrl, requestOptions);
            if (response.ok) {
              let dataRes = await response.json();
              toast.success(dataRes.message);
              toast.error(dataRes.error);
              console.log("data", dataRes);
              dispatch(addUserEmail(dataRes.user_id));
              navigate("/dashboard/agent");
              localStorage.setItem("auth_token", authToken);
            } else {
              toast.error("Failed to update user info");
              console.error("Failed to update user info");
            }
          } catch (error) {
            toast.error("Failed to update user info");
            console.error("Error updating user info:", error);
          }
        } else {
          toast.error("Token not found ");

          console.error("Auth token not found in URL");
        }
      } else if (activeDivIndex < 4) {
        // setActiveDivIndex((prevIndex) => prevIndex + 1);
        console.log("activeDivIndex", activeDivIndex);
        if (userInfo.phone.length > 0) {
          setActiveDivIndex(1);
        }
        // else{
        //   toast.info("Field can't be empty")
        // }

        if (userInfo.full_name.length > 0) {
          setActiveDivIndex(2);
        }
        // else{
        //   toast.info("Field can't be empty")
        // }

        // // setActiveDivIndex(2);

        if (userInfo.designation.length > 0) {
          setActiveDivIndex(3);
        }
        // else{
        //   toast.info("Field can't be empty")
        // }


        if (userInfo.current_usage.length > 0) {
          setActiveDivIndex(4);
        }
        // else{
        //   toast.info("Field can't be empty")
        // }


        // setActiveDivIndex((prevIndex) => prevIndex + 1);

        // if (
        //   userInfo.phone.length == 0 ||
        //   userInfo.current_usage.length == 0 ||
        //   (userInfo.designation.length == 0 &&
        //     (e.key === "Enter" ||
        //       e.keyCode == 13 ||
        //       e.target.id === "arrow-right"))
        // ) {
        //   toast.info("Field Can't be empty");
        // }
      }
    }
    // else if (e.key === "Backspace") {
    //   if (activeDivIndex > 0) {
    //     setActiveDivIndex((prevIndex) => prevIndex - 1);
    //   }
    // }
  };

  // const handleInputChange = (e, key) => {
  //   let value =
  //     e.target.type === "checkbox" ? e.target.checked : e.target.value;
  //   if (key === "current_usage") {
  //     if (e.target.checked) {
  //       value = [...userInfo.current_usage, e.target.value];
  //     } else {
  //       value = userInfo.current_usage.filter(
  //         (item) => item !== e.target.value
  //       );
  //     }
  //   } else if (key === "has_dev_team") {
  //     // Update value to a boolean true/false
  //     value = e.target.value === "YES";
  //   }
  //   setUserInfo((prevState) => ({
  //     ...prevState,
  //     [key]: key === "country_code" ? e.target.value : value,
  //   }));
  // };
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
    } else if (key === "has_dev_team") {
      // Update value to a boolean true/false
      value = e.target.value === "YES";
    }
    setUserInfo((prevState) => ({
      ...prevState,
      [key]: key === "country_code" ? e.target.value : value,
    }));
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [activeDivIndex, userInfo, dispatch]);

  // useEffect(() => {
  //   const urlParams = new URLSearchParams(window.location.search);
  //   const authToken = urlParams.get("auth_token");
  //   if (!authToken) {
  //     navigate("/");
  //   }
  // }, []);

  const renderDiv = (index, content) => (
    <div
      key={index}
      className={`fixed top-0 left-0 w-full h-full flex items-center justify-center transition-transform duration-500 ${
        activeDivIndex === index ? "" : "transform translate-x-full"
      }`}
    >
      <div className="flex flex-col ml-[39px] items-start gap-[12px]">
        {content}
        <div className="w-full">
          <div className="flex justify-between">
            <div>
              <span className="text-zinc-500 text-[12px] font-normal leading-[8.80px]">
                Press{" "}
              </span>
              <span className="text-zinc-500 text-[12px] font-bold leading-[8.80px]">
                Enter
              </span>
            </div>
            <div className="flex items-center gap-5">
              {activeDivIndex > 0 && (
                // <button
                //   className="w-[70px]  bg-white border text-[#71717a] border-[#e4e4e473 rounded-md]"
                //   onClick={() =>
                //     setActiveDivIndex((prevIndex) => prevIndex - 1)
                //   }
                // >
                //   Back
                // </button>
                <img
                  className="w-[15px] h-[15px] cursor-pointer"
                  onClick={() =>
                    setActiveDivIndex((prevIndex) => prevIndex - 1)
                  }
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABcklEQVR4nO2ay0oDMRSGz9KFqNWXEGGozDlTXBTCJGNxpwjnLOpCEBW8PJWKVH0RUSo+0VTipRRbaTtQPBnyQbZDPv4/M0kYAAVYlNQRnxfIF3lLmhAaBfKqI3lyJIPRYVF6e62jFQiBzg6vO+L+bwk3HPwIAUqUk2RyzTWbnoSMVuwUQpdwJIMi4zMIWKIciiAnEHIS7rNWfAc1kHhV9fo1zf01i/wyp8SblwctRAktxCS0YOLCVoKJSSjBxCSUYOqQRDvpNqpsAL08aMKi9OogkQYv4fF3TsFLeCzy9eyJ8LO/swKNOJJswoSDlbmvhUzHn7+R32sh0066Db+Y55Tpq/og/hBlKCazeGLNKNZs8cSaUazZ4ok1I6U1c9nBRpWNptniZaiFDMotaKSCTNnBw00IS+b7rE9jkieglWkyLhSRP2Qm/cJRqv6FY+ZkUG4gFL6uYMcvNCzKgzHHS/89v7nJU0ZHcmmJr3Yz3q7ykA+g2U1XUWxJ1wAAAABJRU5ErkJggg=="
                ></img>
              )}
              {/* next image */}
              <img
                onClick={(e) => {
                  handleKeyPress(e);
                  // setActiveDivIndex((prevIndex) => prevIndex + 1)
                  console.log("@@@@@@@@");
                }}
                id="arrow-right"
                className="w-[15px] h-[15px] cursor-pointer"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABUklEQVR4nO2az0rDQBCH5+rFRnyMorGdTelBWLIbwVsEmaHovdU8lSiCfy6+hiL6RlUWERWLNIHg7DIf7H0+5reTTTYAHfBmNvKGG4e8OChoD2JjOqUNb/jeG377sZAvK6QBxIIzfP1L4ms97++cbIF0yjHhHxLxyDikszVE5Mt4w82aIrJlyuJ46A0vk5BxyDctROTKHE5ON0NxScjYvM684cc2Mg751RdH2yANqzKsnekdjRlqzPpHY4Yas/7RmKHQmIUDY5eDps3rDJKQQb4CiXSRcaPZLqQhQ3NIQcQhLyCFaJUTziH6/WH4AiSRxPi1eZ05pKd27/f0IuqBqBJS0E5IwerGFoLVTgjBaieEYFPoRIU0SOKixyHfpiAx/lbgMkqJQIV0HnUnOojIlUjqF46AM/QQvcTn+F09uegu3MFDbJQfMWvCB7Qwzf67nsA7a8lLpiWSw/MAAAAASUVORK5CYII="
              />
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
            {/* <input
              className={`w-[55px] mr-[10px]  h-[50px] p-2 border border-gray-500`}
              type="tel"
              placeholder="+91"
              onChange={(e) => handleInputChange(e, "country_code")}
            /> */}
            <select
              value={valueSel}
              className={`w-[55px] rounded-sm mr-[10px] h-[50px] p-0 border border-gray-500`}
              onChange={(e) => {
                setValueSel(e.target.value);
                handleInputChange(e, "country_code");
              }}
            >
              <option value="+91">+91</option>
              <option value="+01">+01</option>
            </select>
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
        // <>
        //   <div className="text-black text-lg font-normal leading-tight tracking-tight">
        //     Do your company have a dev team?
        //   </div>
        //   <div>
        //     <div className="flex flex-col gap-[12px]">
        //       <div className="flex items-center">
        //         <input
        //           id="dev-team-yes"
        //           type="checkbox"
        //           name="dev-team"
        //           value="YES"
        //           className="w-[28px] h-[28px] form-checkbox accent-[#433456] text-[#433456]  bg-gray-100 border-gray-300 rounded focus:ring-[#43345661] dark:focus:ring-[#433456] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        //           onChange={(e) => handleInputChange(e, "has_dev_team")}
        //         />
        //         <label
        //           htmlFor="dev-team-yes"
        //           className="ms-2 w-[70vw] md:w-[50vw] rounded-sm lg:w-[425px] py-[4px] px-[6px] border border-gray-500  text-sm font-medium text-gray-900 dark:text-gray-300"
        //         >

        //         </label>
        //       </div>
        //       <div className="flex items-center">
        //         <input
        //           name="dev-team"
        //           id="dev-team-no"
        //           type="checkbox"
        //           value="NO"
        //           className="w-[28px] h-[28px] form-checkbox accent-[#433456] text-[#433456]  bg-gray-100 border-gray-300 rounded focus:ring-[#43345661] dark:focus:ring-[#433456] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        //           onChange={(e) => handleInputChange(e, "has_dev_team")}
        //         />
        //         <label
        //           htmlFor="dev-team-no"
        //           className="ms-2 w-[70vw] md:w-[50vw] rounded-sm lg:w-[425px] py-[4px] px-[6px] border border-gray-500  text-sm font-medium text-gray-900 dark:text-gray-300"
        //         >
        //           NO
        //         </label>
        //       </div>
        //     </div>
        //   </div>
        // </>
        <>
          <div className="text-black text-lg font-normal leading-tight tracking-tight">
            Do your company have a dev team?
          </div>
          <div>
            <div className="flex flex-col gap-[12px]">
              <div className="flex items-center">
                <label
                  htmlFor="dev-team-yes"
                  className="cursor-pointer flex items-center"
                >
                  <input
                    id="dev-team-yes"
                    type="checkbox"
                    name="dev-team"
                    value="YES"
                    className="w-[28px] h-[28px] opacity-0 absolute"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setUserInfo((prevState) => ({
                          ...prevState,
                          has_dev_team: "YES",
                        }));
                      }
                    }}
                    checked={userInfo.has_dev_team === "YES"}
                  />
                  <span className="h-[28px] w-[28px] rounded border border-gray-500 flex items-center justify-center mr-2">
                    {userInfo.has_dev_team === "YES" && (
                      <span className="text-[#433456]">&#10003;</span>
                    )}
                  </span>
                  <span className="ms-2 w-[70vw] md:w-[50vw] rounded-sm lg:w-[425px] py-[4px] px-[6px] border border-gray-500  text-sm font-medium text-gray-900 dark:text-gray-300">
                    YES
                  </span>
                </label>
              </div>
              <div className="flex items-center">
                <label
                  htmlFor="dev-team-no"
                  className="cursor-pointer flex items-center"
                >
                  <input
                    id="dev-team-no"
                    type="checkbox"
                    name="dev-team"
                    value="NO"
                    className="w-[28px] h-[28px] opacity-0 absolute"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setUserInfo((prevState) => ({
                          ...prevState,
                          has_dev_team: "NO",
                        }));
                      }
                    }}
                    checked={userInfo.has_dev_team === "NO"}
                  />
                  <span className="h-[28px] w-[28px] rounded border border-gray-500 flex items-center justify-center mr-2">
                    {userInfo.has_dev_team === "NO" && (
                      <span className="text-[#433456]">&#10003;</span>
                    )}
                  </span>
                  <span className="ms-2 w-[70vw] md:w-[50vw] rounded-sm lg:w-[425px] py-[4px] px-[6px] border border-gray-500  text-sm font-medium text-gray-900 dark:text-gray-300">
                    NO
                  </span>
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
