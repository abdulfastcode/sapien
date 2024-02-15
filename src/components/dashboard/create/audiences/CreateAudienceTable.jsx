import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import EditAudienceComp from "./EditAudienceComp";
import DashboardTable from "../../table/DashboardTable";
import { useMaxHeaderValues } from "../../../../utils/cus-hooks/useMaxHeaderValues";
import { useNavigate } from "react-router-dom";
import TableUploadedData from "./TableUploadedData";

const CreateAudienceTable = () => {
  const navigate = useNavigate();
  const jsonFileData = useSelector((state) => state.fileLoader.json);
  const csvFileData = useSelector((state) => state.fileLoader.csv);
  console.log("jsonFileData", jsonFileData);
  console.log("csvFileData", csvFileData);
  useEffect(() => {
    if (jsonFileData === null && csvFileData === null) {
      console.log("object not loaded");
      navigate("/dashboard/audience/create");
    }
  }, [jsonFileData, navigate]);


  return (
    <div className="w-full">
      <EditAudienceComp />
      {/* <DashboardTable tableData={jsonFileData} maxTableHeaders={maxTableHeaders} /> */}
      {(jsonFileData !=null|| csvFileData!=null) && <TableUploadedData />}
    </div>
  );
};

export default CreateAudienceTable;
