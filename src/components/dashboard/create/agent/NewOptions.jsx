import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { baseUrl } from "../../../../utils/baseUrl";
import SelectOpt from "./SelectOpt";
import { useDispatch, useSelector } from "react-redux";
import { setAgentOptions } from "../../../../utils/slices/createAgentOptionsSlice";

const NewOptions = ({ callScript }) => {
  let { search } = useLocation();
  let querySearch = search?.split("?");
  let indvQuery = querySearch[1];
  let agentIdfromQuery = indvQuery?.split("=").pop();

  const dispatch = useDispatch();
  let optionsState = useSelector((state) => state.createAgentOptions.options);
  const responseMessage = useSelector((state) => state.response.message);

  const [voiceList, setvoiceList] = useState([]);
  const [phoneList, setPhoneList] = useState([]);
  const [conversationList, setconversationList] = useState([]);

  const [operatorList] = useState([
    { name: "OR", conversion_id: "1" },
    { name: "AND", conversion_id: "2" },
  ]);

  const [additionalDivs, setAdditionalDivs] = useState([
    { conversion_id: "", operator: "" },
  ]);

  // const [operatorName, setOperatorName] = useState("");
  // const [conversionId, setConversionId] = useState("");

  let [options, setOptions] = useState({
    name: "",
    phone_id: "",
    voice_id: "",
  });

  function getVoiceList() {
    let token = localStorage.getItem("auth_token");
    fetch(`${baseUrl}/voices/get_voice_list`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setvoiceList(data);
      });
  }

  function getPhoneList() {
    let token = localStorage.getItem("auth_token");

    fetch(`${baseUrl}/phones/get_phone_list?items=20000&page=1`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setPhoneList(data);
      });
  }

  function getConversationList() {
    let token = localStorage.getItem("auth_token");

    fetch(`${baseUrl}/conversions/get_conversion_list?items=20000&page=1`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setconversationList(data);
      });
  }
  console.log("conversationList", conversationList);

  function getAdgentById() {
    let token = localStorage.getItem("auth_token");

    fetch(`${baseUrl}/agents/get_agent?agent_id=${agentIdfromQuery}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setOptions((prevState) => ({ ...prevState, name: data[0]?.name }));
        setOptions((prevState) => ({
          ...prevState,
          phone_id: data[0]?.phone_id,
        }));
        setOptions((prevState) => ({
          ...prevState,
          voice_id: data[0]?.voice_id,
        }));
        setAdditionalDivs(data[0]?.conversions_list);
        console.log("responseeeeeee", data);
      });
  }

  // function sendSelectedValOperator(operatorValue) {
  //   operatorName = operatorValue.name;
  //   console.log(operatorName);
  // }

  // function sendSelectedValConversion(conversionValue) {
  //   conversionId = conversionValue.id;
  //   console.log(conversionId);
  // }
  function renderParentComponent(stateFromChild) {
    console.log("stateFromChild", stateFromChild);
    if (stateFromChild) {
      getConversationList();
    }
  }

  // const sendSelectedValConversion = (conversionValue, i) => {
  //   // let newData = [...additionalDivs];
  //   // newData[i]["conversion_id"] = conversionValue.id;
  //   // setAdditionalDivs(newData);
  //   let newData = additionalDivs.map((item, index) => {
  //     if (index === i) {
  //       return { ...item, conversion_id: conversionValue.id };
  //     }
  //     return item;
  //   });
  //   setAdditionalDivs(newData);
  // };

  // const sendSelectedValOperator = (operatorValue, i) => {
  //   console.log("operatorValue", operatorValue);
  //   console.log("operatorValue i", i);
  //   // let newData = [...additionalDivs];
  //   // newData[i]["operator"] = operatorValue.name;
  //   // setAdditionalDivs(newData);
  //   let newData = additionalDivs.map((item, index) => {
  //     if (index === i) {
  //       return { ...item, operator: operatorValue.name };
  //     }
  //     return item;
  //   });
  //   setAdditionalDivs(newData);
  // };

  const sendSelectedValOperator = (operatorValue, i) => {
    setAdditionalDivs((prevState) => {
      const newData = [...prevState];
      newData[i] = { ...newData[i], operator: operatorValue.name };
      return newData;
    });
  };

  const sendSelectedValConversion = (conversionValue, i) => {
    setAdditionalDivs((prevState) => {
      const newData = [...prevState];
      newData[i] = { ...newData[i], conversion_id: conversionValue.id };
      return newData;
    });
  };

  const removeAddDiv = (i) => {
    let newData = [...additionalDivs];
    newData.splice(i, 1);
    setAdditionalDivs(newData);
  };

  function sendSelectedValVoice(val) {
    console.log("Voice***************", val);
    // setVoiceId(val.id || voiceList[0]?.voice_id);
    setOptions((prevState) => ({
      ...prevState,
      voice_id: val.id,
    }));
  }

  function sendSelectedValPhone(val) {
    setOptions((prevState) => ({
      ...prevState,
      phone_id: val.id,
    }));
  }

  console.log("phoneList", phoneList);
  // WORKING BUT NO UNIQUNESS
  // useMemo(() => {
  //   if (operatorName && conversionId) {
  //     setOptions((prevState) => ({
  //       ...prevState,

  //       conversions_list: [
  //         // ...prevState.conversions_list,
  //         { conversion_id: conversionId, operator: operatorName },
  //       ],
  //     }));
  //   }
  //   // if (additionalDivs.length > 0) {
  //   //   setOptions((prevState) => ({
  //   //     ...prevState,

  //   //     conversions_list: [
  //   //       ...prevState.conversions_list,
  //   //       { conversion_id: conversionId, operator: operatorName },
  //   //     ],
  //   //   }));
  //   // }
  // }, [operatorName, conversionId]);

  console.log(options);

  const handleAddCondition = () => {
    setAdditionalDivs([
      ...additionalDivs,
      { conversion_id: "", operator: "" },
      // <div
      //   key={additionalDivs.length}
      //   className="flex flex-wrap justify-end pb-[15px] gap-[10px]"
      // >
      //   <SelectOpt
      //     width={{ w: "52px", sm: "52px", md: "52px", lg: "52px" }}
      //     optWidth="50px"
      //     options={[
      //       { name: "OR", conversion_id: "1" },
      //       { name: "AND", conversion_id: "2" },
      //     ]}
      //     defaultOption="Operator"
      //     sendSelectedVal={sendSelectedValOperator}
      //   />
      //   <SelectOpt
      //     width={{ w: "210px", sm: "210px", md: "210px", lg: "210px" }}
      //     optWidth="50px"
      //     options={conversationList}
      //     defaultOption={conversationList[0]?.name}
      //     editOpt="true"
      //     create="Create Conversion"
      //     renderParentComponent={renderParentComponent}
      //     sendSelectedVal={sendSelectedValConversion}
      //   />
      // </div>,
    ]);
  };
  useEffect(() => {
    // setScript(callScript?.script);

    if (
      additionalDivs ||
      options.name ||
      options.phone_id ||
      callScript ||
      options.voiceId
    ) {
      dispatch(
        setAgentOptions(
          // body
          {
            conversions_list: additionalDivs,
            script: callScript?.script,
            // options,
            name: options.name,
            phone_id: options.phone_id,
            voice_id: options.voice_id,
          }
        )
      );
    }
  }, [
    additionalDivs,
    callScript,
    options,
    dispatch,
    // resErrData,
    // agentName,
    // updateComp,
    // callScript,
    // conversionId,
    // operator,
    // phoneId,
    // voiceId,
  ]);
  useEffect(() => {
    if (agentIdfromQuery) {
      getAdgentById();
    }
  }, []);
  useMemo(() => {
    getVoiceList();
    getPhoneList();
    getConversationList();
    // For update
  }, []);

  console.log("additionalDivs", additionalDivs);
  console.log("optionsState", optionsState);

  // console.log(conversationList && conversationList, "true");
  // console.log(conversationList.length > 1 ? conversationList : "no Length");
  return (
    <div className="w-full py-[20px] px-[24px] lg:w-[40%] flex flex-col gap-[30px]">
      {responseMessage && (
        <div className="text-[#156534] p-[10px] rounded-sm bg-[#f0fdf5]">
          {responseMessage}
        </div>
      )}
      <div className="flex flex-wrap gap-3 justify-between ">
        <div>Name</div>
        <div>
          <input
            type="text"
            placeholder="Agent Name"
            // ref={agentName}
            value={options.name}
            onChange={(e) =>
              setOptions((prevState) => ({
                ...prevState,
                name: e.target.value,
              }))
            }
            className="border px-[6px] border-black w-[210px]"
          />
        </div> 
      </div>
      {/* VOICE */}
      {voiceList.length > 1 ? (
        <div className="flex flex-wrap gap-3 justify-between ">
          <div>Voice </div>
          <div>
            <SelectOpt
              optionName="Voice"
              width={{ w: "210px", sm: "210px", md: "210px", lg: "210px" }}
              defaultOption={voiceList[0]?.name}
              options={voiceList}
              sendSelectedVal={sendSelectedValVoice}
            />
          </div>
        </div>
      ) : (
        <h1>Loading....</h1>
      )}
      {/* CONVERSION */}
      {conversationList.length > 1 ? (
        <div className="flex flex-wrap gap-3 justify-between ">
          <div>Conversion</div>
          <div>
            {/* <div className="flex flex-wrap justify-end pb-[15px]  gap-[10px]">
              <SelectOpt
                width={{ w: "52px", sm: "52px", md: "52px", lg: "52px" }}
                optWidth="50px"
                options={operatorList}
                defaultOption="Operator"
                sendSelectedVal={sendSelectedValOperator}
              />
              <SelectOpt
                optionName="Conversion"
                width={{ w: "210px", sm: "210px", md: "210px", lg: "210px" }}
                optWidth="50px"
                options={conversationList}
                defaultOption={conversationList[0]?.name}
                editOpt="true"
                create="Create Conversion"
                renderParentComponent={renderParentComponent}
                sendSelectedVal={sendSelectedValConversion}
              />
            </div> */}
            {additionalDivs.map((data, index) => (
              <React.Fragment key={index}>
                <div
                  key={additionalDivs.length}
                  className="flex flex-wrap justify-end pb-[15px] gap-[10px]"
                >
                  {index == 0 ? (
                    ""
                  ) : (
                    <div
                      className="text-[#381E50] cursor-pointer text-md font-bold pr-1"
                      onClick={() => {
                        removeAddDiv(index);
                      }}
                    >
                      X
                    </div>
                  )}
                  <SelectOpt
                    width={{ w: "52px", sm: "52px", md: "52px", lg: "52px" }}
                    optWidth="50px"
                    options={operatorList}
                    index={index}
                    defaultOption="Operator"
                    sendSelectedVal={sendSelectedValOperator}
                  />
                  <SelectOpt
                    optionName="Conversion"
                    width={{
                      w: "210px",
                      sm: "210px",
                      md: "210px",
                      lg: "210px",
                    }}
                    optWidth="50px"
                    options={conversationList}
                    // defaultOption={conversationList[0]?.name}
                    // defaultOption={data[index]?.name}
                    editOpt="true"
                    create="Create Conversion"
                    index={index}
                    renderParentComponent={renderParentComponent}
                    sendSelectedVal={sendSelectedValConversion}
                  />
                </div>
              </React.Fragment>
            ))}
            {/* Add Condition */}
            <div className="float-right">
              <input
                type="button"
                value="+ Add Condition"
                onClick={handleAddCondition}
                className="cursor-pointer border ml-[55px] px-4 border-black bg-[#D7C9FF]"
              />
            </div>
          </div>
        </div>
      ) : (
        <h1>Loading....</h1>
      )}
      {/* AGENT OPRIONS */}
      <div className="flex flex-wrap flex-col gap-[20px]">
        <div className="pb-2 text-[#7B777E]">Agent </div>
        {/* CALL FROM */}
        {phoneList.length > 0 ? (
          <div className="flex flex-wrap gap-3 justify-between ">
            <div>Call From </div>
            <div>
              <SelectOpt
                optionName="Call From"
                width={{ w: "210px", sm: "210px", md: "210px", lg: "210px" }}
                defaultOption={phoneList[0]?.full_phone}
                options={phoneList}
                sendSelectedVal={sendSelectedValPhone}
              />
            </div>
          </div>
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    </div>
  );
};

export default NewOptions;
