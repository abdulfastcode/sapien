import React, { useEffect, useState } from "react";
import { baseUrl, headers } from "../../../../utils/baseUrl";
import EditAgentComp from "./EditAgentComp";
import Options from "./Options";
import Text from "./Text";

const CreateAgent = () => {
  const [callScript, setCallScript] = useState(null);
  const [resData,setResData]  = useState(null);
  useEffect(() => {
  let token = localStorage.getItem("auth_token");

    fetch(`${baseUrl}/agents/get_call_script`, {
      headers: {
        Authorization:
          `Bearer ${token}`,
      },
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
  function sendResData(data){
    console.log("resdata",data)
    setResData(data)
  }
  useEffect(()=>{
    return ()=>{setResData(null)}
  },[])
  return (
    <div className="w-full">
      <EditAgentComp sendResData={sendResData} />
      <div className="flex flex-col lg:flex-row  w-full">
        <Text callScript={callScript} changeText={changeText}/>
        <Options resErrData={resData} callScript={callScript}  />
      </div>
    </div>
  );
};

export default CreateAgent;
