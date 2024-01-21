// import React from 'react'
import { Link } from "react-router-dom";
import deleteIcon from "../../../../assets/icons/deleIcon.svg";
import reloadIcon from "../../../../assets/icons/reload.svg";
import downloadIcon from "../../../../assets/icons/Download.svg";

const EditCamp = () => {
  return (
    <div>
      <div className="w-full flex px-[24px] py-[29px] items-center flex-wrap gap-[20px] justify-between border border-b-[#381E50]">
        <div className="flex gap-[20px] sm:gap-[35px] flex-wrap items-center ">
          <div className="flex  text-[#381E50] gap-[12px] items-center">
            <div>Real-Estate-NYC-HNIs</div>
            <div>12.03.2023 12:23:12</div>
            <div>
              <img src={reloadIcon} alt="" />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-[15px]">
          <div className=" py-[3px] px-[25px] items-center bg-[#FFF172] text-black  text-md ">
            In Progress
          </div>
          <button>
            <img src={downloadIcon} alt="downloadIcon" />
          </button>
          <button>
            <img src={deleteIcon} alt="deleteIcon" />
          </button>
          <Link to={`/dashboard/campaign`}>
            <button className=" py-[3px]  items-center text-[#381E50]  text-md font-bold">
              X
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EditCamp;
