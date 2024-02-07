import { useEffect, useState } from "react";
import Action from "./Action";
import Filter from "./Filter";
import { agentData } from "../../utils/dashbordTablesData/agent";
import DashboardTable from "./table/DashboardTable";
import { useMaxHeaderValues } from "../../utils/cus-hooks/useMaxHeaderValues";
import { useDispatch } from "react-redux";
import { addDataTable } from "../../utils/slices/dashboardSlice";
const Agent = () => {
  // console.log("agentData", agentData);
  const [tableData] = useState(agentData);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(addDataTable(agentData));
  }, []);

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
