import React, { useEffect, useState } from "react";
// import deleteIcon from "../../../../assets/icons/deleIcon.svg";
// import playIcon from "../../../../assets/icons/Play.svg";
// import downloadIcon from "../../../../assets/icons/Download.svg";
import { baseUrl, headers } from "../../../../utils/baseUrl";
import { useDispatch, useSelector } from "react-redux";
import { setAgentOptions } from "../../../../utils/slices/createAgentOptionsSlice";
import SelectOpt from "./SelectOpt";
import { useLocation } from "react-router-dom";

const Options = ({ callScript, resErrData }) => {
  let { search } = useLocation();
  let querySearch = search?.split("?");
  let indvQuery = querySearch[1];
  let agentIdfromQuery = indvQuery?.split("=").pop();

  const [voiceList, setvoiceList] = useState([]);
  const [conversationList, setconversationList] = useState([]);
  const [updateComp, setUpdateComp] = useState(false);
  const [phoneList, setPhoneList] = useState([]);

  const [conversionId, setConversionId] = useState("");
  const [operator, setOperator] = useState("");
  let [agentName, setAgentName] = useState("");
  const [phoneId, setPhoneId] = useState("");
  const [voiceId, setVoiceId] = useState("");
  const [script, setScript] = useState("");

  const [additionalDivs, setAdditionalDivs] = useState([]);

  const [showMess, setShowMess] = useState(false);

  const responseMessage = useSelector((state) => state.response.message);
  console.log("responseMessage", responseMessage);

  let optionsState = useSelector((state) => state.createAgentOptions.options);
  let dispatch = useDispatch();
  // console.log("optionsStateOption-1", optionsState?.name);
  // optionsState.name = agentName;
  // const [fetchedData, setFetchedData] = useState({
  //   voiceList:null,
  //   conversationList:null,
  //   phoneList:null,
  // });
  function renderParentComponent(stateFromChild) {
    setUpdateComp(stateFromChild);
    getConversationList()
  }

  
// const [conversionAndOperator,setConversionAndOperator] = useState([])
  function sendSelectedValConversion(val) {
    console.log("Conversion***************", val);
    setConversionId(val.id || conversationList[0]?.conversion_id);

    // setConversionList({ ...conversionList, conversion_id: val.id });


    // const  updatedConversions =[...conversionAndOperator];
    // const existingConversionIndex = updatedConversions.findIndex(conv => conv.conversionId === val.id);
  
    // if (existingConversionIndex !== -1) {
    //   updatedConversions[existingConversionIndex] = { conversionId: val.id, operator };
    // } else {
    //   updatedConversions.push({ conversionId: val.id, operator });
    // }
  
    // setConversionAndOperator(updatedConversions);
  }

  function sendSelectedValOperator(val) {
    // console.log("Operator***************", val);
    setOperator(val.name);
    // setConversionList({ ...conversionList, operator: val.name });
  }

  function sendSelectedValVoice(val) {
    // console.log("Voice***************", val);
    setVoiceId(val.id || voiceList[0]?.voice_id);
    // setBody({ ...body, voice_id: val?.voice_id });
    // setConversionList({ ...conversionList, conversion_id: val});
  }
  function sendSelectedValPhone(val) {
    // console.log("Phone***************", val);
    setPhoneId(val.id || phoneList[0]?.phone_id);
  }

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

  function getAdgentById() {
    let token = localStorage.getItem("auth_token");

    fetch(`${baseUrl}/agents/get_agent?agent_id=${agentIdfromQuery}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setAgentName(data[0]?.name);
        console.log("responseeeeeee", data);
      });
  }

  useEffect(() => {
    getVoiceList();
    // getConversationList();
    getPhoneList();
    getConversationList();

    // For update
    if (agentIdfromQuery) {
      getAdgentById();
    }
  }, []);

  useEffect(() => {
    setScript(callScript?.script);

    if (conversionId || operator || agentName || phoneId || script || voiceId) {
      dispatch(
        setAgentOptions(
          // body
          {
            conversions_list: [
              {
                conversion_id: conversionId,
                operator: operator,
              },
            ],
            name: agentName,
            phone_id: phoneId,
            script: callScript?.script,
            voice_id: voiceId,
          }
        )
      );
    }

    // else{
    //    dispatch(
    //     setAgentOptions(
    //       // body
    //       {
    //         conversions_list: [
    //           {
    //             conversion_id: conversationList[0]?.conversion_id,
    //             operator: operator,
    //           },
    //         ],
    //         name: agentName,
    //         phone_id: phoneList[0]?.phone_id,
    //         script: callScript?.script,
    //         voice_id: voiceList[0]?.voice_id,
    //       }
    //     )
    //   );
    // }

    // if (responseMessage) {
    //   setShowMess(true);
    //   const timeout = setTimeout(() => {
    //     setShowMess(false);
    //   }, 4000);

    //   return () => clearTimeout(timeout);
    // }
  }, [
    resErrData,
    agentName,
    updateComp,
    callScript,
    conversionId,
    operator,
    phoneId,
    voiceId,
  ]);

  console.log("optionsState-", optionsState);
  console.log("voiceId-", voiceId);
  console.log("conversionId-", conversionId);
  console.log("conversionList-", conversationList);
  console.log("voiceList-", voiceList);
  console.log("phoneList-", phoneList);
  console.log("agentName-", agentName);

  const handleAddCondition = () => {
    setAdditionalDivs([
      ...additionalDivs,
      <div
        key={additionalDivs.length}
        className="flex flex-wrap justify-end pb-[15px] gap-[10px]"
      >
        <SelectOpt
          width={{ w: "52px", sm: "52px", md: "52px", lg: "52px" }}
          optWidth="50px"
          options={[
            { name: "OR", conversion_id: "1" },
            { name: "AND", conversion_id: "2" },
          ]}
          defaultOption="Operator"
          sendSelectedVal={sendSelectedValOperator}
        />
        <SelectOpt
          width={{ w: "210px", sm: "210px", md: "210px", lg: "210px" }}
          optWidth="50px"
          options={conversationList}
          defaultOption={conversationList[0]?.name}
          editOpt="true"
          create="Create Conversion"
          renderParentComponent={renderParentComponent}
          sendSelectedVal={sendSelectedValConversion}
        />
      </div>,
    ]);
  };

  return (
    <div className="w-full py-[20px] px-[24px] lg:w-[40%] flex flex-col gap-[30px]">
      {/* NAME */}
      {voiceList.error && <div className="text-red-500">No Voice List</div>}
      {phoneList.error && <div className="text-red-500">No Phone List</div>}
      {/* {responseMessage && (
        <div className="text-[#156534] p-[10px] rounded-sm bg-[#f0fdf5]">
          {responseMessage}
        </div>
      )} */}
      <div className="flex flex-wrap gap-3 justify-between ">
        <div>Name</div>
        <div>
          <input
            type="text"
            placeholder="Agent Name"
            // ref={agentName}
            value={agentName}
            onChange={(e) => setAgentName(e.target.value)}
            className="border px-[6px] border-black w-[210px]"
          />
        </div>
      </div>
      {/* VOICE */}
      {!voiceList.error && (
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
      )}
      {/* CONVERSION */}
      {conversationList && (
        <div className="flex flex-wrap gap-3 justify-between ">
          <div>Conversion</div>
          <div>
            <div className="flex flex-wrap justify-end pb-[15px]  gap-[10px]">
              <SelectOpt
                width={{ w: "52px", sm: "52px", md: "52px", lg: "52px" }}
                optWidth="50px"
                options={[
                  { name: "OR", conversion_id: "1" },
                  { name: "AND", conversion_id: "2" },
                ]}
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
            </div>
            {additionalDivs.map((div, index) => (
              <React.Fragment key={index}>{div}</React.Fragment>
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
      )}
      {/* AGENT OPRIONS */}
      <div className="flex flex-wrap flex-col gap-[20px]">
        <div className="pb-2 text-[#7B777E]">Agent </div>
        {/* CALL FROM */}
        {!phoneList.error && (
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
        )}

        {/* CALL TO Disabled for now!!!!!!!!!!!!!!!!*/}
        {/* <div className="flex flex-wrap gap-3 justify-between ">
          <div>Call To </div>

          <div className="flex flex-col gap-[20px]">
            <div className="flex gap-[10px]">
              <select className="border px-[6px] border-black ">
                <option value="">IN</option>
              </select>
              <input
                type="tel"
                placeholder="9637842074"
                className="border px-[6px] border-black w-[155px]"
              />
             
            </div>
            <div className="text-right">
              <button className="border bg-[#381E50] border-[#381E50] text-white py-2 px-4">
                Test Call
              </button>
            </div>
          </div>
        </div> */}
      </div>

      {/* <div className="flex flex-col gap-[20px]">
        <div className="pb-2 text-[#7B777E]">Old Recordings </div>
        <div className="flex justify-between ">
          <div>29.03.2023 17:55:56 </div>

          <div className="flex gap-[18px]">
            <div>
              <img src={playIcon} alt="" />
            </div>
            <div>
              <img src={downloadIcon} alt="" />
            </div>
            <div>
              <img src={deleteIcon} alt="" />
            </div>
          </div>
        </div>
        <div className="flex justify-between ">
          <div>29.03.2023 17:55:56 </div>

          <div className="flex gap-[18px]">
            <div>
              <img src={playIcon} alt="" />
            </div>
            <div>
              <img src={downloadIcon} alt="" />
            </div>
            <div>
              <img src={deleteIcon} alt="" />
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Options;
