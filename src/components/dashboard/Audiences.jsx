// import React from "react";

import { useEffect, useState } from "react";
import Action from "./Action";
import Filter from "./Filter";
// import { audienceData } from "../../utils/dashbordTablesData/Audience";
// import { agentData } from "../../utils/dashbordTablesData/agent";
import { useMaxHeaderValues } from "../../utils/cus-hooks/useMaxHeaderValues";
import DashboardTable from "./table/DashboardTable";
import { useDispatch, useSelector } from "react-redux";
import {
  addCheckboxState,
  addDataTable,
} from "../../utils/slices/dashboardSlice";
import { baseUrl, headers } from "../../utils/baseUrl";
 
const Audiences = () => {
  // console.log("comp mount from main audiences");

  // let checkbox = useSelector((state) => state.dashboard.checkBox);
  const [updateComp, setUpdateComp] = useState(false);

  let [tableData, setTableData] = useState([]);
  // const dispatch = useDispatch();
  // if (checkbox.length > 0||checkbox===null) {
  //   dispatch(addCheckboxState([]));
  // }
  useEffect(() => {
    // console.log("audience useEffect");
    let token = localStorage.getItem("auth_token");
    fetch(`${baseUrl}/audiences/get_audience_list?items=20000&page=1`, {
      // referrerPolicy: "unsafe_url" ,
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
    return () => {
      // console.log("comp unmount from audiences");
    };
  }, [updateComp]);
  // console.log(tableData);

  let maxTableHeaders = useMaxHeaderValues(tableData);
  maxTableHeaders?.sort();
  function setData(val) {
    // console.log("val", val);
    setTableData(val);
    // console.log(selectedData)
  } 
  function renderParentComponent(stateFromChild) {
    setUpdateComp(stateFromChild);
  }

  return (
    <div className="w-full">
      <Filter selectedData={tableData} />
      <Action
        selectedData={tableData}
        renderParentComponent={renderParentComponent}
      />
      <DashboardTable
        tableData={tableData}
        setData={setData}
        maxTableHeaders={maxTableHeaders}
      />
    </div>
  );
};

export default Audiences;
