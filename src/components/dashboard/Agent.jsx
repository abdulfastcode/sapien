import { useEffect, useState } from "react";
import Action from "./Action";
import Filter from "./Filter";
// import { agentData } from "../../utils/dashbordTablesData/agent";
import DashboardTable from "./table/DashboardTable";
import { useMaxHeaderValues } from "../../utils/cus-hooks/useMaxHeaderValues";
import { useDispatch, useSelector } from "react-redux";
import {
  addCheckboxState,
  addDataTable,
} from "../../utils/slices/dashboardSlice";
import { baseUrl, headers } from "../../utils/baseUrl";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Agent = () => {
  // console.log("agentData", agentData);
  // console.log("comp mount from main agent");
  const user = useSelector((state) => state.user);
  let navigate = useNavigate()
console.log("userrmail",user)
  // const dispatch = useDispatch();
  const [updateComp, setUpdateComp] = useState(false);
  let [tableData, setTableData] = useState([]);

  // let checkbox = useSelector((state) => state.dashboard.checkBox);
  // if (checkbox.length > 0 || checkbox === null) {
  //   dispatch(addCheckboxState([]));
  // } 
  const urlParams = new URLSearchParams(window.location.search);
  console.log("urlParams---", urlParams);
  const authToken = urlParams.get("auth_token");
  if (authToken) {
    localStorage.setItem("auth_token", authToken);
  }


  let token = localStorage.getItem("auth_token");
  console.log("token", token);
  useEffect(() => {
    // console.log("agent headers",headers)
    let token = localStorage.getItem("auth_token");
    fetch(`${baseUrl}/agents/get_agent_list?items=20000&page=1`, {
      headers: {
        Authorization:
          `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if(data.message=="Token is invalid!"){
          localStorage.removeItem("token");
          toast.info("Token is invalid")
          navigate("/")
        }
        setTableData(data);
        // dispatch(addDataTable(data));
      });
  }, [updateComp]);
  // console.log(tableData);

  let maxTableHeaders = useMaxHeaderValues(tableData);
  maxTableHeaders?.sort();
  // console.log("maxTableHeaders", maxTableHeaders);
  // console.log("newTableHeader", newTableHeader);
  // getmaxHeaderValues()

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

export default Agent;
