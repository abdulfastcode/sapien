import React from "react";
import EditCamp from "./EditCamp";
import Options from "./Options";
import EditCampTable from "./EditCampTable";

const CreateCampaign = () => {
  return <div className="w-full ">
    
    <EditCamp/>
    <Options/>
    <EditCampTable/>
  </div>;
};

export default CreateCampaign;
