import React, { useEffect } from "react";
import EditAudienceComp from "./EditAudienceComp";
import UploadFile from "./UploadFile";
import { useDispatch, useSelector } from "react-redux";
import { uploadAudienceName } from "../../../../utils/slices/fileSlice";

const CreateAudience = () => {
  let dispatch = useDispatch();
  let jsonFileData = useSelector((state) => state.fileLoader.json);
  let csvFileData = useSelector((state) => state.fileLoader.csv);
  console.log(jsonFileData);
  useEffect(() => {
  }, []);
  return (
    <div className="w-full">
      <EditAudienceComp />
      <UploadFile />
    </div>
  );
};

export default CreateAudience;
