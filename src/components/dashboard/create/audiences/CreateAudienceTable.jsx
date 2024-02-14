import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditAudienceComp from "./EditAudienceComp";
import DashboardTable from "../../table/DashboardTable";
import { useMaxHeaderValues } from "../../../../utils/cus-hooks/useMaxHeaderValues";

const CreateAudienceTable = () => {
  //   let [tableData, setTableData] = useState([]);
  let jsonFileData = useSelector((state) => state.fileLoader.json);

  let maxTableHeaders = useMaxHeaderValues(jsonFileData);
  maxTableHeaders?.sort();
  console.log(jsonFileData);
  return (
    <div className="w-full">
      <EditAudienceComp />
      <DashboardTable
        tableData={jsonFileData}
        maxTableHeaders={maxTableHeaders}
      />
    </div>
  );
};

export default CreateAudienceTable;
