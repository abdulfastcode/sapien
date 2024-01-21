import React from "react";
import EditAudienceComp from "./EditAudienceComp";
import UploadFile from "./UploadFile";

const CreateAudience = () => {
  return (
    <div className="w-full">
      <EditAudienceComp />
      <UploadFile/>
    </div>
  );
};

export default CreateAudience;
