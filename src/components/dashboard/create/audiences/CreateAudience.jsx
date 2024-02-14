import React, { useEffect } from "react";
import EditAudienceComp from "./EditAudienceComp";
import UploadFile from "./UploadFile";
import { useSelector } from "react-redux";

const CreateAudience = () => {
  
  let jsonFileData = useSelector((state) => state.fileLoader.json);
  let csvFileData = useSelector((state) => state.fileLoader.csv);
  console.log(jsonFileData);
  useEffect(()=>{

  },[jsonFileData])
  return (
    <div className="w-full">
      <EditAudienceComp />
      <UploadFile/>
    </div>
  );
};

export default CreateAudience;
