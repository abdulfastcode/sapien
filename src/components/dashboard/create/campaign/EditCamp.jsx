// import React from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";
import deleteIcon from "../../../../assets/icons/deleIcon.svg";
import reloadIcon from "../../../../assets/icons/reload.svg";
import downloadIcon from "../../../../assets/icons/Download.svg";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { baseUrl } from "../../../../utils/baseUrl";
import { createdCampaignResponse } from "../../../../utils/slices/createcampaignOptionsSlice";

const EditCamp = ({
  btnStatusStartCamp,
  setBtnStatusStartCamp,
  indvQuery,
  campStarted,
  campaignData,
  refrenshCampAndCampData
}) => {
  const [checkStartBtn,setCheckStartBtn] = useState(true)
  let dispatch = useDispatch();
  console.log("campaignData",campaignData);
  console.log("campStarted",campStarted);
  let optionsState = useSelector(
    (state) => state.createCampaignOptions.options
  );
  // console.log("optionsState", optionsState);
  let { search } = useLocation();
  console.log("search", search);
  console.log("btnStatusStartCamp", btnStatusStartCamp);
  console.log("checkStartBtn", checkStartBtn);

  if (search === ""&&checkStartBtn===true) {
    console.log("curerntly in search!!!!!!!!!!");
  setBtnStatusStartCamp(true)
  }
  // createdCampResponse is a Id getting while clicked on save
  let createdCampResponse = useSelector(
    (state) => state.createCampaignOptions?.createdCampaignResponse
  );
  console.log("createdCampResponse", createdCampResponse);

  const checkQueryAndCampData = indvQuery && campaignData.length > 0;
  console.log("checkQueryAndCampData", checkQueryAndCampData);

  function saveData() {
    // console.log("object")
    console.log("jsonData", JSON.stringify(optionsState));
    async function saveUserOptions() {
      try {
        let token = localStorage.getItem("auth_token");
        let post = await fetch(`${baseUrl}/campaigns/create_campaign`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(optionsState),
        });
        let res = await post.json();
        if(res.error){
          setBtnStatusStartCamp(true);
        setCheckStartBtn(true)
        }
        if(res.campaign_id){
          setBtnStatusStartCamp(false);
          setCheckStartBtn(false)
        }
        
        // dispatch(createdCampaignResponse([res]))
        dispatch(createdCampaignResponse(res.campaign_id));
        console.log("res-", res);
        console.log("btnStatusStartCamp", btnStatusStartCamp);
        console.log("checkStartBtn", checkStartBtn);
      } catch (e) {
        console.error(e);
      }
    }
    saveUserOptions();
  }

  function reload() {
    refrenshCampAndCampData()
  }

  useEffect(() => {
    return () => {
      console.log("edit camp unmpunt");
      dispatch(createdCampaignResponse());
    };
  }, []);
  return (
    <div>
      <div className="w-full flex px-[24px] py-[29px] items-center flex-wrap gap-[20px] justify-between border border-b-[#381E50]">
        <div className="flex gap-[20px] sm:gap-[35px] flex-wrap items-center ">
          <div className="flex  text-[#381E50] gap-[12px] items-center">
            <div className="font-semibold">
              {checkQueryAndCampData ||campaignData.length>0
                ? campaignData[0]?.name
                : optionsState?.name.length > 0
                ? optionsState?.name
                : "Campaign Name"}
            </div>
            {(checkQueryAndCampData ||campaignData.length>0 || campStarted) && (
              <>
                <div>{campaignData[0]?.created_on}</div>
                <div>
                  <img className="cursor-pointer" onClick={reload} src={reloadIcon} alt="reloadIcon" />
                </div>
              </>
            )}
          </div>
        </div>
        <div className="flex items-center gap-[15px]">
          {checkQueryAndCampData ||campaignData.length>0 || createdCampResponse ? (
            ""
          ) : (
            <button
              onClick={saveData}
              className=" py-[3px] px-[25px] items-center bg-[#381E50] text-white  text-md font-bold"
            >
              Save
            </button>
          )}
          {(checkQueryAndCampData||campaignData.length>0) && (
            <div
              className={` py-[3px] px-[25px] items-center ${
                checkQueryAndCampData && campaignData[0]?.status === "completed"
                  ? "bg-[#B3EBB9]"
                  : checkQueryAndCampData &&
                    campaignData[0]?.status === "in progress"
                  ? "bg-[#FFF172]"
                  : "bg-purple-300"
              } text-black  text-md `}
            >
              {campaignData[0]?.status||checkQueryAndCampData  }
            </div>
          )}
          {checkQueryAndCampData ? (
            <>
              <button>
                <img src={downloadIcon} alt="downloadIcon" />
              </button>
              <button>
                <img src={deleteIcon} alt="deleteIcon" />
              </button>
            </>
          ) : null}
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
