import React, { useEffect, useState } from "react";
import EditCamp from "./EditCamp";
import Options from "./Options";
import EditCampTable from "./EditCampTable";
import { useLocation } from "react-router-dom";
import { baseUrl, headers } from "../../../../utils/baseUrl";
import DashboardTable from "../../table/DashboardTable";
import { useMaxHeaderValues } from "../../../../utils/cus-hooks/useMaxHeaderValues";
import { useSelector } from "react-redux";

const CreateCampaign = () => {
  const [campaignData, setCampaignData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [campStarted, setCampStarted] = useState(false);

  let { search } = useLocation();
  let querySearch = search?.split("?");
  let indvQuery = querySearch[1];
  console.log(indvQuery);

  let createdCampResponse = useSelector(
    (state) => state.createCampaignOptions.createdCampaignResponse
  );
  console.log("createdCampResponse",createdCampResponse)
  function getCamp() {
    fetch(`${baseUrl}/campaigns/get_campaign?${indvQuery}`, {
      headers,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("resxxaxaxasx,",data)
        setCampaignData(data);
        // dispatch(addDataTable(data));
      });
  }

  function getCampTableData() {
    fetch(`${baseUrl}/calls/get_call_by_campaign?${indvQuery}`, {
      headers,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data[0]?.calls);
        setTableData(data[0]?.calls);
        console.log("tableData", tableData);

        // dispatch(addDataTable(data));
      });
  }

  useEffect(() => {
    if (indvQuery) {
      getCamp();
      getCampTableData();
    }
  }, []);

  let maxTableHeaders = useMaxHeaderValues(tableData);
  maxTableHeaders?.sort();
  function setData(val) {
    // console.log("val", val);
    setTableData(val);
    // console.log(selectedData)
  }

  function startCamp(){
    async function saveUserOptions() {
      console.log("json",JSON.stringify({campaign_id:createdCampResponse.campaign_id}),)
      try {
        let post = await fetch(`${baseUrl}/campaigns/start_campaign`, {
          method: "POST",
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYWJkdWwifQ.QRyeI86pVtG8vJuQCWM-l0mAbC6IAUrp8ppcD7gzHBc",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({campaign_id:createdCampResponse.campaign_id}),
        });
        let res = await post.json();
        // navigate('/dashboard/agent')
        console.log("res-", res);
        setCampStarted(true)
        console.log("campStarted",campStarted)
      } catch (e) {
        console.error(e);
      }
    }
    saveUserOptions();
  }
  return (
    <div className="w-full ">
      <EditCamp campStarted={campStarted} campaignData={campaignData} indvQuery={indvQuery} />
      <Options campaignData={campaignData} indvQuery={indvQuery} />
      {indvQuery && (
        // <EditCampTable campaignData={campaignData} indvQuery={indvQuery} />

        // PAUSE
        <><div className="w-full h-[40vh] lg:h-[47vh] relative">
        <DashboardTable
          tableData={tableData}
          setData={setData}
          maxTableHeaders={maxTableHeaders}
        />
          {/* <div className="hidden  z-20 sm:flex w-full h-[66px] px-[24px] justify-end items-center border bg-white border-[#433456] sticky  bottom-0">
            <button className="border border-[#381E50] py-1 px-4">Pause</button>
          </div>  */}
          </div>
          
          {/* <div className="flex z-20  sm:hidden w-full h-[66px] px-[24px] justify-end items-center border bg-white border-[#433456] sticky  bottom-0">
          <button className="border border-[#381E50] py-1 px-4">Pause</button>
        </div>  */}
        </>
      )}
      {createdCampResponse&&
      <><div className="w-full h-[40vh] lg:h-[47vh] relative">
       
          <div className="hidden  z-20  sm:flex w-full h-[66px] px-[24px] justify-end items-center border bg-white border-[#433456] sticky  bottom-0">
            <button className="border border-[#381E50] py-1 px-4" onClick={startCamp}>Start</button>
          </div> 
          </div>
          
          <div className="flex  z-20  sm:hidden w-full h-[66px] px-[24px] justify-end items-center border bg-white border-[#433456] sticky  bottom-0">
          <button className="border border-[#381E50] py-1  px-4" onClick={startCamp}>Start</button>
        </div> 
        </>}
    </div>
  );
};

export default CreateCampaign;
