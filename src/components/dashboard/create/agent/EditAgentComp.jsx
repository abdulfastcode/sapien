// import React from "react";
import { Link, useNavigate } from "react-router-dom";
import deleteIcon from "../../../../assets/icons/deleIcon.svg";
import { useSelector } from "react-redux";
import { baseUrl } from "../../../../utils/baseUrl";

const EditAgentComp = () => {
  let optionsState = useSelector((state) => state.createAgentOptions.options);
  let navigate  = useNavigate()
  // console.log("optionsStateEDIT", optionsState);

  function saveData() {
    // console.log("object")
    console.log("jsonData", JSON.stringify(optionsState));
    async function saveUserOptions() {
      try {
        let post = await fetch(`${baseUrl}/agents/create_agent`, {
          method: "POST",
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYWJkdWwifQ.QRyeI86pVtG8vJuQCWM-l0mAbC6IAUrp8ppcD7gzHBc",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(optionsState),
        });
        let res = await post.json();
        navigate('/dashboard/agent')
        console.log("res-", res);
      } catch (e) {
        console.error(e);
      }
    }
    saveUserOptions();
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
            onClick={saveData}
            className=" py-[3px] px-[25px] items-center bg-[#381E50] text-white  text-md font-bold"
          >
            Save
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
