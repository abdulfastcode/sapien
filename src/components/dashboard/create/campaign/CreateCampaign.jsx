import React, { useEffect, useState } from "react";
import EditCamp from "./EditCamp";
import Options from "./Options";
import EditCampTable from "./EditCampTable";
import { useLocation } from "react-router-dom";
import { baseUrl, headers } from "../../../../utils/baseUrl";
import DashboardTable from "../../table/DashboardTable";
import { useMaxHeaderValues } from "../../../../utils/cus-hooks/useMaxHeaderValues";
import { useDispatch, useSelector } from "react-redux";
import { createdCampaignResponse } from "../../../../utils/slices/createcampaignOptionsSlice";

const CreateCampaign = () => {
  let dispatch = useDispatch();
  const [campaignData, setCampaignData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [showStartBtn, setShowStartBtn] = useState(false);
  const [btnStatusStartCamp, setBtnStatusStartCamp] = useState(false);

  console.log("showStartBtn", showStartBtn);
  let { search } = useLocation();
  let querySearch = search?.split("?");
  let indvQuery = querySearch[1];
  let campIdfromQuery = indvQuery?.split("").pop();
  console.log("qieryNO", indvQuery?.split("").pop());
  // if (indvQuery) {
  //   setShowStartBtn(true);
  // }
  let createdCampResponse = useSelector(
    (state) => state.createCampaignOptions?.createdCampaignResponse
  );
  console.log("createdCampResponse", createdCampResponse);

  function getCamp() {
    let token = localStorage.getItem("auth_token");
// will get the resp status
    fetch(`${baseUrl}/campaigns/get_campaign?${indvQuery}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("resxxaxaxasx,", data);
        setCampaignData(data);
        // dispatch(addDataTable(data));
      });
  }

  function getCampTableData() {
    let token = localStorage.getItem("auth_token");
    fetch(`${baseUrl}/calls/get_call_by_campaign?${indvQuery}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data[0]?.calls);
        setTableData(data[0]?.calls);
        console.log("tableData", tableData);

        // dispatch(addDataTable(data));
      });
  }

  let maxTableHeaders = useMaxHeaderValues(tableData);
  maxTableHeaders?.sort();
  function setData(val) {
    // console.log("val", val);
    setTableData(val);
    // console.log(selectedData)
  }

  async function startCamp() {
    let campId;
    if (!campIdfromQuery) {
      campId = createdCampResponse;
      console.log("campId", campId);
    } else {
      campId = campIdfromQuery;
      console.log("campId", campId);
    }
    console.log("json", JSON.stringify({ campaign_id: campIdfromQuery }));
    let token = localStorage.getItem("auth_token");
    try {
      let post = await fetch(`${baseUrl}/campaigns/start_campaign`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          campaign_id: campId,
        }),
      });
      let res = await post.json();
      // navigate('/dashboard/agent')
      console.log("res-", res);
      setBtnStatusStartCamp(true);
      console.log("showStartBtn", showStartBtn);
    } catch (e) {
      console.error(e);
    }
  }
  if (indvQuery) {
  }
  useEffect(() => {
    if (indvQuery) {
      getCamp();
      getCampTableData();
      setShowStartBtn(true);
      // dispatch(createdCampaignResponse())
      console.log("showStartBtn", showStartBtn);
    }
  }, []);
  console.log("showStartBtn", showStartBtn);

  return (
    <div className="w-full ">
      <EditCamp
        showStartBtn={showStartBtn}
        campaignData={campaignData}
        indvQuery={indvQuery}
      />
      <Options
        showStartBtn={showStartBtn}
        campaignData={campaignData}
        indvQuery={indvQuery}
      />
      {indvQuery && (
        
        // PAUSE
        <>
        {/* <EditCampTable campaignData={campaignData} indvQuery={indvQuery} /> */}
          <div className="w-full h-[40vh] lg:h-[47vh] relative">
            <DashboardTable
              tableData={tableData}
              setData={setData}
              maxTableHeaders={maxTableHeaders}
            />
           
          </div>

          {/* <div className="flex z-20  sm:hidden w-full h-[66px] px-[24px] justify-end items-center border bg-white border-[#433456] sticky  bottom-0">
          <button className="border border-[#381E50] py-1 px-4">Pause</button>
        </div>  */}
        </>
      )}
      {(createdCampResponse || showStartBtn) && (
        <>
          <div className="hidden sm:block w-full h-auto relative bg-white">
            <div className="hidden  z-20  sm:flex w-full h-[66px] px-[24px] justify-end items-center border bg-white border-[#433456] sticky  bottom-0">
              <button
                disabled={btnStatusStartCamp?true:false}
                className={`border border-[#381E50] ${btnStatusStartCamp?"cursor-not-allowed":"cursor-pointer"} py-1  px-4`}
                onClick={startCamp}
              >
                Start
              </button>
            </div>
          </div>

          <div className="flex  z-20  sm:hidden w-full h-[66px] px-[24px] justify-end items-center border bg-white border-[#433456] sticky  bottom-0">
            <button
              disabled={btnStatusStartCamp?true:false}
              className={`border border-[#381E50] ${btnStatusStartCamp?"cursor-not-allowed":"cursor-pointer"} py-1  px-4`}
              onClick={startCamp}
            >
              Start
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CreateCampaign;
