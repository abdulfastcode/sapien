// import React from 'react'

import { useState } from "react";
import Action from "./Action";
import Filter from "./Filter";
import DashboardTable from "./table/DashboardTable";
import { campaignData } from "../../utils/dashbordTablesData/campaign";
import { useMaxHeaderValues } from "../../utils/cus-hooks/useMaxHeaderValues";

const Campaign = () => {
  let [tableData, setTableData] = useState(campaignData);
  let maxTableHeaders = useMaxHeaderValues(tableData);
  return (
    <div className="w-full">
      <Filter />
      <Action />
      <DashboardTable tableData={tableData} maxTableHeaders={maxTableHeaders} />
    </div>
  );
};

export default Campaign;
