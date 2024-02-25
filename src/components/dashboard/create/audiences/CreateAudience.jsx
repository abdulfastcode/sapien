import React, { useEffect } from "react";
import EditAudienceComp from "./EditAudienceComp";
import UploadFile from "./UploadFile";
import { useDispatch, useSelector } from "react-redux";
import { uploadAudienceName } from "../../../../utils/slices/fileSlice";
import { audienceDownloadedData } from "../../../../utils/slices/downloadData";

const CreateAudience = () => {
  let dispatch = useDispatch();
  const downlaodedData = useSelector((state) => state.downloadData.downloads);
  let jsonFileData = useSelector((state) => state.fileLoader.json);
  let csvFileData = useSelector((state) => state.fileLoader.csv);
  console.log("csvFileData", csvFileData);
  useEffect(() => {
    // return () => {
    //   console.log("create Audience unmount*************");
    //   console.log("downlaodedData", downlaodedData);

    //   dispatch(audienceDownloadedData(""));
    //   console.log("downlaodedData", downlaodedData);
    // };
  }
  , []);
  return (
    <div className="w-full">
      <EditAudienceComp />
      <UploadFile />
    </div>
  );
};

export default CreateAudience;
