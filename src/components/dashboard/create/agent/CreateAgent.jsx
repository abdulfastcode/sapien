import React, { useEffect, useState } from "react";
import { baseUrl, headers } from "../../../../utils/baseUrl";
import EditAgentComp from "./EditAgentComp";
import Options from "./Options";
import Text from "./Text";

const CreateAgent = () => {
  const [callScript, setCallScript] = useState(null);
  useEffect(() => {
    fetch(`${baseUrl}/agents/get_call_script`, {
      headers,
    })
      .then((response) => response.json())
      .then((data) => {
        setCallScript(data);
      });
  }, []);
  function changeText(val) {
    setCallScript({...callScript,script:val});
    console.log("callScript", callScript);
  }
  console.log("callScript", callScript);
  return (
    <div className="w-full">
      <EditAgentComp />
      <div className="flex flex-col lg:flex-row  w-full">
        <Text callScript={callScript} changeText={changeText}/>
        <Options callScript={callScript}  />
      </div>
    </div>
  );
};

export default CreateAgent;
