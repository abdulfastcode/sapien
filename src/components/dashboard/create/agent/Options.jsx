import React, { useEffect, useState } from "react";
// import deleteIcon from "../../../../assets/icons/deleIcon.svg";
// import playIcon from "../../../../assets/icons/Play.svg";
// import downloadIcon from "../../../../assets/icons/Download.svg";
import { baseUrl, headers } from "../../../../utils/baseUrl";
import { useDispatch, useSelector } from "react-redux";
import { setAgentOptions } from "../../../../utils/slices/createAgentOptionsSlice";
import SelectOpt from "./SelectOpt";

const Options = ({ callScript, resErrData }) => {
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
  }

  // useEffect(()=>{},[])
  function sendSelectedValConversion(val) {
    // console.log("Conversion***************", val);
    setConversionId(val.id);
    // setConversionList({ ...conversionList, conversion_id: val.id });
  }

  function sendSelectedValOperator(val) {
    // console.log("Operator***************", val);
    setOperator(val.name);
    // setConversionList({ ...conversionList, operator: val.name });
  }

  function sendSelectedValVoice(val) {
    // console.log("Voice***************", val);
    setVoiceId(val.id);
    // setBody({ ...body, voice_id: val?.voice_id });
    // setConversionList({ ...conversionList, conversion_id: val});
  }
  function sendSelectedValPhone(val) {
    // console.log("Phone***************", val);
    setPhoneId(val.id);
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

    fetch(`${baseUrl}/conversions/get_conversion_list`, {
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

    fetch(`${baseUrl}/phones/get_phone_list`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setPhoneList(data);
      });
  }

  useEffect(() => {
    setScript(callScript?.script);

    if (conversionId && operator && agentName && phoneId && script && voiceId) {
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
            script: script,
            voice_id: voiceId,
          }
        )
      );
    }
    getVoiceList();
    getConversationList();
    getPhoneList();

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
  // console.log(
  //   "conversionId-",
  //   conversionId,
  //   "operator-",
  //   operator,
  //   "agentName-",
  //   agentName,
  //   "phoneId-",
  //   phoneId,
  //   "script-",
  //   script,
  //   "voiceId-",
  //   voiceId
  // );
  console.log("voiceList", voiceList);
  console.log("phoneList", phoneList);
  console.log("conversationList", conversationList);
  console.log("agentName->", agentName);
  console.log("optionsState->", optionsState);
  console.log("showMess->", showMess);
  return (
    <div className="w-full py-[20px] px-[24px] lg:w-[40%] flex flex-col gap-[30px]">
      {/* Success Message */}
      {/* <div
        id="alert-border-3"
        className="flex items-center p-4 mb-4 text-green-800 border-t-4 border-green-300 bg-green-50 dark:text-green-400 dark:bg-gray-800 dark:border-green-800"
        role="alert"
      >
        <svg
          className="flex-shrink-0 w-4 h-4"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
        </svg>
        <div className="ms-3 text-sm font-medium">
          A simple success alert with an{" "}
          <a href="#" className="font-semibold underline hover:no-underline">
            example link
          </a>
          . Give it a click if you like.
        </div>
        <button
          type="button"
          className="ms-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700"
          data-dismiss-target="#alert-border-3"
          aria-label="Close"
        >
          <span className="sr-only">Dismiss</span>
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
        </button>
      </div> */}
      {/* NAME */}
      {voiceList.error && <div className="text-red-500">No Voice List</div>}
      {phoneList.error && <div className="text-red-500">No Phone List</div>}
      { responseMessage && (
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
            {/* <select className="border px-[6px] border-black w-[210px]">
            {voiceList != null ? (
              voiceList.map((e) => {
                return (
                  <option key={e.voice_id} value={e.name}>
                    {e.name}
                  </option>
                );
              })
            ) : (
              <option value={"loading"}>Laoding...</option>
            )}
           
          </select> */}
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
                // sendSelectedValOperator={sendSelectedVal}
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
              {/* <select className="border px-[6px] border-black w-[155px]">
              {phoneList != null ? (
                phoneList.map((e) => {
                  return (
                    <option key={e.phone_id} value={e.full_phone}>
                      {e.full_phone}
                    </option>
                  );
                })
              ) : (
                <option value={"loading"}>Laoding...</option>
              )}
              
            </select> */}
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
