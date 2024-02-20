// import React from 'react'

import { useState, useEffect } from "react";
import Action from "./Action";
import Filter from "./Filter";
import DashboardTable from "./table/DashboardTable";
import { campaignData } from "../../utils/dashbordTablesData/campaign";
import { useMaxHeaderValues } from "../../utils/cus-hooks/useMaxHeaderValues";
import { baseUrl, headers } from "../../utils/baseUrl";

// import { useDispatch } from "react-redux";
// import { addDataTable } from "../../utils/slices/dashboardSlice";

const Campaign = () => {
  // const dispatch = useDispatch();
  // let [tableData] = useState(campaignData);
  const [updateComp, setUpdateComp] = useState(false);
  let [tableData, setTableData] = useState([]);
  useEffect(() => {
    // dispatch(addDataTable(campaignData));
    let token = localStorage.getItem("auth_token");

    fetch(`${baseUrl}/campaigns/get_campaigns_list?items=20000&page=1`, {
      headers: {
        Authorization:
          `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setTableData(data);
        // dispatch(addDataTable(data));
      });
  }, [updateComp]);
  let maxTableHeaders = useMaxHeaderValues(tableData);
  // maxTableHeaders?.sort();

  function setData(val) {
    // console.log("val", val);
    setTableData(val);
  }

  function renderParentComponent(stateFromChild) {
    setUpdateComp(stateFromChild);
  }

  return (
    <div className="w-full">
      <Filter selectedData={tableData}/>
      <Action
        renderParentComponent={renderParentComponent}
        selectedData={tableData}
      />
      <DashboardTable
        tableData={tableData}
        setData={setData}
        maxTableHeaders={maxTableHeaders}
      />
    </div>
  );
};

export default Campaign;
