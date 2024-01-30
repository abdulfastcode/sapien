// import React from 'react'

import { useState,useEffect } from "react";
import Action from "./Action";
import Filter from "./Filter";
import DashboardTable from "./table/DashboardTable";
import { campaignData } from "../../utils/dashbordTablesData/campaign";
import { useMaxHeaderValues } from "../../utils/cus-hooks/useMaxHeaderValues";
import { useDispatch } from "react-redux";
import { addDataTable } from "../../utils/dashboardSlice";

const Campaign = () => {
  let [tableData] = useState(campaignData);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(addDataTable(campaignData));
  }, []);
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
