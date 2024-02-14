import React, { useEffect, useState } from "react";
import EditCamp from "./EditCamp";
import Options from "./Options";
import EditCampTable from "./EditCampTable";
import { useLocation } from "react-router-dom";
import { baseUrl, headers } from "../../../../utils/baseUrl";

const CreateCampaign = () => {
  const [campaignData, setCampaignData] = useState([]);
  let { search } = useLocation();
  let querySearch = search?.split("?");
  let indvQuery = querySearch[1];
  console.log(indvQuery);

  useEffect(() => {
    if (indvQuery) {
      fetch(`${baseUrl}/campaigns/get_campaign?${indvQuery}`, {
        headers,
      })
        .then((response) => response.json())
        .then((data) => {
          setCampaignData(data);
          // dispatch(addDataTable(data));
        });
    }
  }, []);

  return (
    <div className="w-full ">
      <EditCamp campaignData={campaignData} indvQuery={indvQuery} />
      <Options campaignData={campaignData} indvQuery={indvQuery} />
      {indvQuery && (
        <EditCampTable campaignData={campaignData} indvQuery={indvQuery} />
      )}
    </div>
  );
};

export default CreateCampaign;
