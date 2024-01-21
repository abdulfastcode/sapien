// import React from "react";
import { Link } from "react-router-dom";
import deleteIcon from "../../../../assets/icons/deleIcon.svg";

const EditAgentComp = () => {
  return (
    <div>
      <div className="w-full flex px-[24px] py-[29px] items-center flex-wrap gap-[20px] justify-between border border-b-[#381E50]">
        <div className="flex gap-[20px] sm:gap-[35px] flex-wrap items-center ">
          <div className="flex font-bold text-[#381E50] gap-[12px] items-center">
            <div>Real State Hindi</div>
          </div>
        </div>
        <div className="flex items-center gap-[15px]">
          <button className=" py-[3px] px-[25px] items-center bg-[#381E50] text-white  text-md font-bold">
            Save
          </button>
          <button>
            <img src={deleteIcon} alt="deleteIcon" />
          </button>
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
