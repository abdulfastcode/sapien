import React, { useEffect, useMemo, useState } from "react";
import Select from "./Select";
import { baseUrl } from "../../../../../utils/baseUrl";
import { useLocation, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAgentOptions } from "../../../../../utils/slices/createAgentOptionsSlice";
import { toast } from "react-toastify";

const NewOpt = ({ callScript }) => {
  const dispatch = useDispatch();
  const responseMessage = useSelector((state) => state.response.message);


  const [voiceList, setVoiceList] = useState([]);
  const [phoneList, setPhoneList] = useState([]);
  const [conversationList, setconversationList] = useState([]);
  const [operatorList] = useState([
    { name: "OR", operator_id: "1" },
    { name: "AND", operator_id: "2" },
  ]);

  const [callToCountryCode, setCallToCountryCode] = useState([
    { name: "IN", countrycode_id: 1, countryCode: "+91" },
    { name: "USA", countrycode_id: 2, countryCode: "+01" },
    { name: "UK", countrycode_id: 3, countryCode: "+44" },
  ]);

  const [testAgentContact, setTestAgentContact] = useState({
    countrycode: { name: "IN", countrycode_id: 1, countryCode: "+91" },
    phone: "",
  });

  const [value, setValue] = useState({
    phone: "",
    voice: "",
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
  console.log("responseMessage",responseMessage)

  useMemo(() => {
    if (isExestingValues.length > 0) {
      console.log("voiceList", voiceList);
      console.log("isExestingValues", isExestingValues);

      let exestingName = isExestingValues[0]?.name;
      let input = isExestingValues[0]?.conversions_list;

      let updatedConversions = [];
      input.forEach(({ conversion_id, operator }) => {
        let conversion = conversationList.find(
          (c) => c.conversion_id === conversion_id
        );
        let operatorObj = operatorList.find((o) => o.name === operator);
        if (conversion && operatorObj) {
          updatedConversions.push({
            conversion: [conversion],
            operator: [operatorObj],
          });
        }
      });
      // setValue({ conversions: updatedConversions });
      console.log("updatedConversions", updatedConversions);

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
        name: exestingName,
        conversions: updatedConversions,
      });
      console.log("checkPhoneId", checkPhoneId);
      console.log("exestingName", exestingName);

      // console.log("ids", isExestingValues[0]?.phone_id, phoneList[0].phone_id);
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
  }, [voiceList, phoneList, conversationList, isExestingValues]);

  const handleAddCondition = () => {
    // setAdditionalDivs([...additionalDivs, { conversion_id: "", operator: "" }]);
    setValue({
      ...value,
      conversions: [
        ...value.conversions,
        {
          conversion: [conversationList[0]],
          operator: [{ name: "OR", operator_id: "1" }],
        },
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

  useEffect(() => {
    console.log("value", value);
    let conversions_list = value?.conversions?.map(
      ({ conversion, operator }) => ({
        conversion_id: conversion[0]?.conversion_id,
        operator: operator[0]?.name,
      })
    );
    let name = value?.name;
    let voice_id = value?.voice?.voice_id;
    let phone_id = value?.phone?.phone_id;
    let script = callScript?.script;

    console.log(
      "voice_id",
      voice_id,
      "phone_id",
      phone_id,
      "conversions_list",
      conversions_list,
      "callScript",
      script,
      "name",
      name
    );
    dispatch(
      setAgentOptions({
        conversions_list: conversions_list,
        script: script,
        name: name,
        phone_id: phone_id,
        voice_id: voice_id,
      })
    );
  }, [value, callScript]);

  function renderParentComponent(stateFromChild) {
    console.log("stateFromChild", stateFromChild);
    if (stateFromChild) {
      getConversationList();
    }
  }

  async function testCall(e) {
    const body = {
      agent_id: agentIdfromQuery,
      contact: {
        country_code: testAgentContact.countrycode.countryCode,
        phone: testAgentContact.phone,
      },
    };
    console.log("body",JSON.stringify(body))
    console.log("test", e);
    try {
      let token = localStorage.getItem("auth_token");
      let post = await fetch(`${baseUrl}/agents/test_agent`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      let res = await post.json();
      
      if (res.message) {
        toast.success(res.message);
      }
      if (res.error) {
        toast.error(res.error);
      }
      // setUpdateDefaultName(true)
      console.log("resEdit-", res);
      
    } catch (e) {
      toast.error("Failed to Create Conversion");
      console.error(e);
    }
    e.stopPropagation();
  }

  console.log("voiceList", voiceList);
  console.log("phoneList", phoneList);
  console.log("conversationList", conversationList);
  console.log("isExestingValues", isExestingValues);
  console.log("valueOp", value);
  console.log("testAgentContact", testAgentContact);
  return (
    <div className="w-full py-[20px] px-[24px] lg:w-[40%] flex flex-col gap-[30px]">
      <div className="flex flex-wrap gap-3  justify-between ">
        <div>Name</div>
        <div>
          <input
            type="text"
            placeholder="Agent Name"
            value={value.name}
            onChange={(e) =>
              setValue((prevState) => ({
                ...prevState,
                name: e.target.value,
              }))
            }
            className="border px-[6px] h-[35px] ring-offset focus:ring-2 focus:ring-[#43345661] focus-visible:outline-none  border-black w-[210px]"
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
                  editOpt="true"
                  create="Create Conversion"
                  renderParentComponent={renderParentComponent}
                  value={value?.conversions[index].conversion[0]}
                  options={conversationList}
                  onChange={(o) =>
                    setValue((prevState) => ({
                      ...prevState,
                      conversions: prevState.conversions.map((c, i) =>
                        i === index ? { ...c, conversion: [o] } : c
                      ),
                    }))
                  }
                />
              </div>
            </React.Fragment>
          ))}
          <div className="float-right">
            <input
              type="button"
              value="+ Add Conversion"
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
        {agentIdfromQuery && (
          <div className="flex flex-wrap gap-3 justify-between ">
            <div>Call To </div>

            <div className="flex flex-col gap-[20px]">
              <div className="flex gap-[10px]">
                {/* <select className="border px-[6px] border-black ">
                <option value="">IN</option>
              </select> */}
                <Select
                  value={testAgentContact.countrycode}
                  options={callToCountryCode}
                  onChange={(o) =>
                    setTestAgentContact({ ...testAgentContact, countrycode: o })
                  }
                />
                <input
                  minLength="8"
                  maxLength="12"
                  name="Number"
                  id="Number"
                  // pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                  value={testAgentContact.phone}
                  onChange={(e) =>
                    setTestAgentContact({
                      ...testAgentContact,
                      phone: e.target.value,
                    })
                  }
                  type="tel"
                  placeholder="1234567890"
                  className="border px-[6px] ring-offset focus:ring-2 focus:ring-[#43345661] focus-visible:outline-none border-black w-[210px] "
                />
              </div>
              <div className="text-right">
                <button
                  onClick={(e) => testCall(e)}
                  className="border bg-[#381E50] border-[#381E50] text-white py-2 px-4"
                >
                  Test Call
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewOpt;
