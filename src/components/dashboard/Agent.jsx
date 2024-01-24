// import React from "react";

import { useState } from "react";
import Action from "./Action";
import Filter from "./Filter";
import { agentData } from "../../utils/dashbordTablesData/agent";
import { isDraft } from "@reduxjs/toolkit";
import DashboardTable from "./table/DashboardTable";
import { useMaxHeaderValues } from "../../utils/cus-hooks/useMaxHeaderValues";
const Agent = () => {
  // console.log("agentData", agentData);
  const [tableData, setTableData] = useState(agentData);

  let maxTableHeaders = useMaxHeaderValues(tableData);

  // getmaxHeaderValues()

  return (
    <div className="w-full">
      <Filter />
      <Action />
      <DashboardTable tableData={tableData} maxTableHeaders={maxTableHeaders} />
    </div>
  );
};

export default Agent;
