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
import { toast } from "react-toastify";

const CreateCampaign = () => {
  let dispatch = useDispatch();
  const [campaignData, setCampaignData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [showStartBtn, setShowStartBtn] = useState(false);
  const [btnStatusStartCamp, setBtnStatusStartCamp] = useState(false);
  const [renderComp, setRenderComp] = useState(false);

  console.log("showStartBtn", showStartBtn); 
  let { search } = useLocation();
  let querySearch = search?.split("?");
  let indvQuery = querySearch[1];
  let campIdfromQuery = indvQuery?.split("=").pop();
  console.log("qieryNO", indvQuery?.split("=").pop());
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
    let id = createdCampResponse || campIdfromQuery;
    console.log("get_campaignid", id);
    console.log("createdCampResponse", createdCampResponse);
    console.log(
      "urlCreateID",
      `${baseUrl}/campaigns/get_campaign?campaign_id${id}`
    );
    fetch(`${baseUrl}/campaigns/get_campaign?campaign_id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("ressx,", data);
        setCampaignData(data);
        if (data[0]?.status === "not started") {
          console.log("setting not started");
          setBtnStatusStartCamp(false);
        }

        if (data[0]?.status === "in progress") {
          console.log("setting in progress");
          setBtnStatusStartCamp(true);
        }

        if (data[0]?.status === "completed") {
          setBtnStatusStartCamp(true);
        }
        // dispatch(addDataTable(data));
      });
  }

  function getCampTableData() {
    let id = createdCampResponse || campIdfromQuery;
    console.log("get_campaignid", id);
    console.log(
      "urlID",
      `${baseUrl}/calls/get_call_by_campaign?campaign_id=${id}&items=20000&page=1`
    );
    let token = localStorage.getItem("auth_token");
    fetch(
      `${baseUrl}/calls/get_call_by_campaign?campaign_id=${id}&items=20000&page=1`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data[0]?.calls);
        setTableData(data[0]?.calls);
        console.log("tableData", tableData);

        // dispatch(addDataTable(data));
      });
  }
  console.log("tableData", tableData);

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
    console.log("json", JSON.stringify({ campaign_id: campId }));
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
      if (post.status === 200) {
        toast.success(res.message);
      } else {
        toast.error(res.error);
      }
      console.log("res-", res);
      if (res.campaign_id) {
        setBtnStatusStartCamp(true);
      }
      console.log("btnStatusStartCamp", btnStatusStartCamp);
    } catch (e) {
      toast.error("Failed to Start Campaign");
      console.error(e);
    }
  }

  function refrenshCampAndCampData() {
    console.log("refresh!!!!!!!! calling  getCampand getCampTableData ");
    getCamp();
    getCampTableData();
  }

  useEffect(() => {
    console.log("createdCampResponse", createdCampResponse);
    if (indvQuery || createdCampResponse) {
      console.log("createdCampResponse", createdCampResponse);
      setRenderComp(!renderComp);
      getCamp();
      getCampTableData();
      // setShowStartBtn(true);
      // dispatch(createdCampaignResponse())
      console.log("showStartBtn", showStartBtn);
    }
  }, [createdCampResponse]);
  console.log("showStartBtn", showStartBtn);
  console.log("btnStatusStartCamp", btnStatusStartCamp);

  return (
    <div className="w-full relative">
      <EditCamp
        btnStatusStartCamp={btnStatusStartCamp}
        setBtnStatusStartCamp={setBtnStatusStartCamp}
        showStartBtn={showStartBtn}
        campaignData={campaignData}
        indvQuery={indvQuery}
        refrenshCampAndCampData={refrenshCampAndCampData}
      />
      <Options
        showStartBtn={showStartBtn}
        campaignData={campaignData}
        indvQuery={indvQuery}
      />
      {(indvQuery || campaignData.length > 0) && (
        // PAUSE
        <>
          {/* <EditCampTable campaignData={campaignData} indvQuery={indvQuery} /> */}
          <div className="w-full h-[40vh] lg:h-[29.4vh] relative">
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
      {!btnStatusStartCamp && (
        <>
          <div className="hidden sm:block w-full h-auto relative bg-white">
            <div className="hidden  z-20  sm:flex w-full lg:w-[calc(100%-9.1%)] h-[66px] px-[24px] justify-end items-center border bg-white border-[#433456] fixed  bottom-0">
              <button
                disabled={btnStatusStartCamp ? true : false}
                className={`border border-[#381E50] ${
                  btnStatusStartCamp
                    ? "opacity-0"
                    : "cursor-pointer opacity-100"
                } py-1  px-4`}
                onClick={startCamp}
              >
                Start
              </button>
            </div>
          </div>

          <div className="flex  z-20  sm:hidden w-full lg:w-[calc(100%-9.1%)] h-[66px] px-[24px] justify-end items-center border bg-white border-[#433456] fixed  bottom-0">
            <button
              disabled={btnStatusStartCamp ? true : false}
              className={`border border-[#381E50] ${
                btnStatusStartCamp ? "opacity-0" : "cursor-pointer opacity-100"
              } py-1  px-4`}
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
