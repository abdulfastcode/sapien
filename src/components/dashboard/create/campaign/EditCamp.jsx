// import React from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";
import deleteIcon from "../../../../assets/icons/deleIcon.svg";
import reloadIcon from "../../../../assets/icons/reload.svg";
import downloadIcon from "../../../../assets/icons/Download.svg";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { baseUrl } from "../../../../utils/baseUrl";

const EditCamp = ({ indvQuery, campaignData }) => {
  console.log(campaignData);
  let optionsState = useSelector(
    (state) => state.createCampaignOptions.options
  );
  // console.log("optionsState", optionsState);
  
  const checkQueryAndCampData = indvQuery && campaignData.length > 0;

  function saveData() {
    // console.log("object")
    console.log("jsonData", JSON.stringify(optionsState));
    async function saveUserOptions() {
      try {
        let post = await fetch(`${baseUrl}/campaigns/create_campaign`, {
          method: "POST",
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYWJkdWwifQ.QRyeI86pVtG8vJuQCWM-l0mAbC6IAUrp8ppcD7gzHBc",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(optionsState),
        });
        let res = await post.json();
      
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
          <div className="flex  text-[#381E50] gap-[12px] items-center">
            <div>
              {checkQueryAndCampData ? campaignData[0]?.name : "CUST NAME"}
            </div>
            {checkQueryAndCampData && (
              <>
                <div>{campaignData[0]?.created_on}</div>
                <div>
                  <img src={reloadIcon} alt="" />
                </div>
              </>
            )}
          </div>
        </div>
        <div className="flex items-center gap-[15px]">
          <button
            onClick={saveData}
            className=" py-[3px] px-[25px] items-center bg-[#381E50] text-white  text-md font-bold"
          >
            Save
          </button>
          {checkQueryAndCampData && (
            <div
              className={` py-[3px] px-[25px] items-center ${
                checkQueryAndCampData && campaignData[0]?.status === "completed"
                  ? "bg-[#B3EBB9]"
                  : checkQueryAndCampData &&
                    campaignData[0]?.status === "in-progress"
                  ? "bg-[#FFF172]"
                  : "bg-purple-300"
              } text-black  text-md `}
            >
              {checkQueryAndCampData && campaignData[0]?.status}
            </div>
          )}
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
