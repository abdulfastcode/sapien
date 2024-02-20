// import React from "react";
import { Link, useNavigate } from "react-router-dom";
import deleteIcon from "../../../../assets/icons/deleIcon.svg";
import { useSelector } from "react-redux";
import { baseUrl } from "../../../../utils/baseUrl";
import { useEffect } from "react";

const EditAgentComp = ({ sendResData }) => {
  let optionsState = useSelector((state) => state.createAgentOptions.options);
  let navigate = useNavigate();
  // console.log("optionsStateEDIT", optionsState);
  function saveData() {
    // console.log("object")
    sendResData(null);
    console.log("jsonData", JSON.stringify(optionsState));
    async function saveUserOptions() {
      try {
        let token = localStorage.getItem("auth_token");

        let post = await fetch(`${baseUrl}/agents/create_agent`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(optionsState),
        });
        let res = await post.json();
        console.log("res", post);
        if (post.status == 400) {
          sendResData("Field Missing");
        }
        // navigate('/dashboard/agent')
        console.log("res-", res);
      } catch (e) {
        console.error(e);
      }
    }
    if (optionsState) {
      saveUserOptions();
    }
  }

  return (
    <div>
      <div className="w-full flex px-[24px] py-[29px] items-center flex-wrap gap-[20px] justify-between border border-b-[#381E50]">
        <div className="flex gap-[20px] sm:gap-[35px] flex-wrap items-center ">
          <div className="flex font-bold text-[#381E50] gap-[12px] items-center">
            <div>
              {optionsState?.name == "null" || optionsState?.name?.length < 1
                ? "Agent Name"
                : optionsState?.name}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-[15px]">
          <button
         disabled={optionsState?false:true}
            onClick={saveData}
            className={` py-[3px] px-[25px] items-center ${optionsState?"bg-[#381E50] cursor-pointer":"bg-red-400 cursor-not-allowed"} text-white  text-md font-bold`}
          >
            {optionsState?"Save":"Select all the below field"}
          </button>
          {/* <button>
            <img src={deleteIcon} alt="deleteIcon" />
          </button> */}
          <Link to={`/dashboard/agent`}>
            <button className=" py-[3px]  items-center text-[#381E50]  text-md font-bold">
              X
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EditAgentComp;
