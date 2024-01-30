// import React from "react";

import { useEffect, useState } from "react";
import Action from "./Action";
import Filter from "./Filter";
import { audienceData } from "../../utils/dashbordTablesData/audience";
// import { agentData } from "../../utils/dashbordTablesData/agent";
import { useMaxHeaderValues } from "../../utils/cus-hooks/useMaxHeaderValues";
import DashboardTable from "./table/DashboardTable";
import { useDispatch } from "react-redux";
import { addDataTable } from "../../utils/dashboardSlice";

const Audiences = () => {
  let [tableData] = useState(audienceData);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(addDataTable(audienceData));
  }, []);
  let maxTableHeaders = useMaxHeaderValues(tableData);

  return (
    <div className="w-full">
      <Filter />
      <Action />
      <DashboardTable maxTableHeaders={maxTableHeaders} tableData={tableData} />
    </div>
  );
};

export default Audiences;
