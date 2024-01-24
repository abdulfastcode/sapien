// import React from "react";

import { useState } from "react";
import Action from "./Action";
import Filter from "./Filter";
import { audienceData } from "../../utils/dashbordTablesData/audience";
import { useMaxHeaderValues } from "../../utils/cus-hooks/useMaxHeaderValues";
import DashboardTable from "./table/DashboardTable";

const Audiences = () => {
  let [tableData, setTableData] = useState(audienceData);
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
