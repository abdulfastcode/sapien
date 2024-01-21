// import React from "react";
import EditAgentComp from "./EditAgentComp";
import Options from "./Options";
import Text from "./Text";

const CreateAgent = () => {
  return (
    <div className="w-full">
      <EditAgentComp />
      <div className="flex flex-col lg:flex-row  w-full">
        <Text />
        <Options />
      </div>
    </div>
  );
};

export default CreateAgent;
