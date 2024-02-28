import React, { useEffect, useMemo, useState } from "react";
import { baseUrl, headers } from "../../../../utils/baseUrl";
import EditAgentComp from "./EditAgentComp";
import Options from "./Options";
import Text from "./Text";
import { useDispatch } from "react-redux";
import { setAgentOptions } from "../../../../utils/slices/createAgentOptionsSlice";
import { setResponseMessage } from "../../../../utils/slices/responseSlice";
import { useLocation } from "react-router-dom";
import NewOptions from "./NewOptions";
import NewOpt from "./select/NewOpt";

const CreateAgent = () => {
  let dispatch = useDispatch();
  const [callScript, setCallScript] = useState(null);
  const [resData, setResData] = useState(null);

  let { search } = useLocation();
  let querySearch = search?.split("?");
  let indvQuery = querySearch[1];
  let agentIdfromQuery = indvQuery?.split("=").pop();

  useMemo(() => {
    let token = localStorage.getItem("auth_token");

    if (agentIdfromQuery) {
      fetch(`${baseUrl}/agents/get_agent?agent_id=${agentIdfromQuery}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setCallScript({ script: data[0]?.script });
          console.log("responseeeeeee", data[0].script);
        });
    } else {
      fetch(`${baseUrl}/agents/get_call_script`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setCallScript(data);
        });
    }
    return () => {
      dispatch(setAgentOptions());
      // dispatch(setResponseMessage());
    };
  }, [dispatch]);
  console.log("callScript", callScript);
  function changeText(val) {
    console.log("callScript", callScript);

    setCallScript({ ...callScript, script: val });
  }
  console.log("callScript", callScript);
  function sendResData(data) {
    console.log("resdata", data);
    setResData(data);
  }

  return (
    <div className="w-full">
      <EditAgentComp sendResData={sendResData} />
      <div className="flex flex-col lg:flex-row  w-full">
        <Text callScript={callScript} changeText={changeText} />
        {/* <Options resErrData={resData} callScript={callScript} /> */}
        {/* <NewOptions callScript={callScript} /> */}
        <NewOpt callScript={callScript} resData={resData} />
      </div>
    </div>
  );
};

export default CreateAgent;
