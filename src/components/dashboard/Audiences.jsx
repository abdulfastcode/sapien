// import React from "react";

import { useEffect, useState } from "react";
import Action from "./Action";
import Filter from "./Filter";
// import { audienceData } from "../../utils/dashbordTablesData/Audience";
// import { agentData } from "../../utils/dashbordTablesData/agent";
import { useMaxHeaderValues } from "../../utils/cus-hooks/useMaxHeaderValues";
import DashboardTable from "./table/DashboardTable";
import { useDispatch } from "react-redux";
import { addDataTable } from "../../utils/slices/dashboardSlice";

const Audiences = () => {
  let [tableData, setTableData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const headers = {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYWJkdWwifQ.QRyeI86pVtG8vJuQCWM-l0mAbC6IAUrp8ppcD7gzHBc",
    };
    fetch("http://3.6.158.162:5000/audiences/get_audience_list", {
      // referrerPolicy: "unsafe_url" ,
      headers,
    })
      .then((response) => response.json())
      .then((data) => setTableData(data));
  }, []);
  console.log(tableData);
  dispatch(addDataTable(tableData));

  let maxTableHeaders = useMaxHeaderValues(tableData);
  maxTableHeaders?.sort();

  return (
    <div className="w-full">
      <Filter />
      <Action />
      <DashboardTable maxTableHeaders={maxTableHeaders} tableData={tableData} />
    </div>
  );
};

export default Audiences;
