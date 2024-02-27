import React, { useEffect, useMemo, useState } from "react";
import Select from "./Select";
import { baseUrl } from "../../../../../utils/baseUrl";
import { useLocation } from "react-router-dom";

const NewOpt = () => {
  const [voiceList, setVoiceList] = useState([]);
  const [phoneList, setPhoneList] = useState([]);
  const [conversationList, setconversationList] = useState([]);
  const [operatorList] = useState([
    { name: "OR", operator_id: "1" },
    { name: "AND", operator_id: "2" },
  ]);
  const [value, setValue] = useState({
    conversions: [
      { conversion: [{}], operator: [{ name: "OR", operator_id: "1" }] },
    ],
  });

  const [isExestingValues, setIsExestingValues] = useState([]);

  const [additionalDivs, setAdditionalDivs] = useState([
    { conversion_id: "", operator: "OR" },
  ]);

  let { search } = useLocation();
  let querySearch = search?.split("?");
  let indvQuery = querySearch[1];
  let agentIdfromQuery = indvQuery?.split("=").pop();

  function getVoiceList() {
    let token = localStorage.getItem("auth_token");
    fetch(`${baseUrl}/voices/get_voice_list`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        setVoiceList(data);
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

  function getAdgentById() {
    let token = localStorage.getItem("auth_token");

    fetch(`${baseUrl}/agents/get_agent?agent_id=${agentIdfromQuery}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("idData", data);
        setIsExestingValues(data);
        //    console.log("voiceList",voiceList)
      });
  }

  useEffect(() => {
    getPhoneList();
    getVoiceList();
    getConversationList();
    if (agentIdfromQuery) {
      getAdgentById();
    }
  }, []);

  useMemo(() => {
    if (isExestingValues.length > 0) {
      console.log("voiceList", voiceList);

      const checkVoiceId = voiceList.findIndex(
        (v) => v?.voice_id == isExestingValues[0]?.voice_id
      );
      const checkPhoneId = phoneList.findIndex(
        (v) => v?.phone_id == isExestingValues[0]?.phone_id
      );

      setValue({
        ...value,
        phone: phoneList[checkPhoneId],
        voice: voiceList[checkVoiceId],
      });
      console.log("checkPhoneId", checkPhoneId);

      console.log("ids", isExestingValues[0]?.phone_id, phoneList[0].phone_id);
    } else {
      console.log("voiceList", voiceList);

      setValue({
        ...value,
        phone: phoneList[0],
        voice: voiceList[0],
        conversions: [
          {
            ...value.conversions[0],
            conversion: [conversationList[0]],
          },
        ],
      });
    }
  }, [voiceList, phoneList, additionalDivs]);

  const handleAddCondition = () => {
    // setAdditionalDivs([...additionalDivs, { conversion_id: "", operator: "" }]);
    setValue({
      ...value,
      conversions: [
        ...value.conversions,
        { conversion: [{}], operator: [{ name: "OR", operator_id: "1" }] },
      ],
    });
  };

  const removeAddDiv = (index) => {
    // let newData = [...additionalDivs];
    // newData.splice(i, 1);
    // setAdditionalDivs(newData);
    setValue({
      ...value,
      conversions: value.conversions.filter((_, i) => i !== index),
    });
  };

  console.log("voiceList", voiceList);
  console.log("phoneList", phoneList);
  console.log("conversationList", conversationList);
  console.log("isExestingValues", isExestingValues);
  console.log("valueOp", value);
  return (
    <div className="w-full py-[20px] px-[24px] lg:w-[40%] flex flex-col gap-[30px]">
      <div className="flex flex-wrap gap-3 justify-between ">
        <div>Name</div>
        <div>
          <input
            type="text"
            placeholder="Agent Name"
            // value={options.name}
            // onChange={(e) =>
            //   setOptions((prevState) => ({
            //     ...prevState,
            //     name: e.target.value,
            //   }))
            // }
            className="border px-[6px] border-black w-[210px]"
          />
        </div>
      </div>
      {/* Voice */}
      <div className="flex flex-wrap gap-3 justify-between ">
        <div>Voice</div>
        <Select
          value={value.voice}
          options={voiceList}
          onChange={(o) => setValue({ ...value, voice: o })}
        />
      </div>
      {/* Conversion */}
      <div className="flex flex-wrap gap-3 justify-between ">
        <div>Conversion</div>
        <div>
          {value.conversions.map((data, index) => (
            <React.Fragment key={index}>
              <div
                key={additionalDivs.length}
                className="flex flex-wrap items-center justify-end pb-[15px] gap-[10px]"
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
                <Select
                  value={value?.conversions[index].operator[0]}
                  options={operatorList}
                  // onChange={(o) =>
                  //   setValue({
                  //     ...value,
                  //     conversions: [
                  //       {
                  //         ...value.conversions[0],
                  //         operator: [o],
                  //       },
                  //     ],
                  //   })
                  // }
                  onChange={(o) =>
                    setValue((prevState) => ({
                      ...prevState,
                      conversions: prevState.conversions.map((c, i) =>
                        i === index ? { ...c, operator: [o] } : c
                      ),
                    }))
                  }
                />
                <Select
                  value={value?.conversions[index].conversion[0]}
                  options={conversationList}
                  // onChange={(o) =>
                  //   setValue({
                  //     ...value,
                  //     conversions: [
                  //       {
                  //         ...value.conversions[0],
                  //         conversion: [o],
                  //       },
                  //     ],
                  //   })
                  // }
                  onChange={(o) =>
                    setValue((prevState) => ({
                      ...prevState,
                      conversions: prevState.conversions.map((c, i) =>
                        i === index ? { ...c, conversion: [o] } : c
                      ),
                    }))
                  }
                />
                {/* <SelectOpt
                    width={{ w: "52px", sm: "52px", md: "52px", lg: "52px" }}
                    optWidth="50px"
                    options={operatorList}
                    index={index}
                    defaultOption="Operator"
                    sendSelectedVal={sendSelectedValOperator}
                  /> */}
                {/* <SelectOpt
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
                  /> */}
              </div>
            </React.Fragment>
          ))}
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

      {/* AGENT OPTIONS */}
      <div className="flex flex-wrap flex-col gap-[20px]">
        <div className="pb-2 text-[#7B777E]">Agent </div>

        {/* Call From */}
        <div className="flex flex-wrap gap-3 justify-between ">
          <div>Call From </div>
          <div>
            <Select
              value={value.phone}
              options={phoneList}
              onChange={(o) => setValue({ ...value, phone: o })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewOpt;
