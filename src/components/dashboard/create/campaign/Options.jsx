import React, { useEffect, useState } from "react";
import SelectOpt from "../agent/SelectOpt";
import { baseUrl, headers } from "../../../../utils/baseUrl";
import MultiSelect from "./MultiSelect";
import { useDispatch } from "react-redux";
import { setAgentOptions } from "../../../../utils/slices/createAgentOptionsSlice";
import { setCampaignOptions } from "../../../../utils/slices/createcampaignOptionsSlice";

const Options = ({ indvQuery, campaignData }) => {
  let dispatch = useDispatch();
  const [agentList, setAgentList] = useState([]);
  const [audienceList, setAudienceList] = useState([]);
  const [agentId, setAgentId] = useState("");
  const [audienceIds, setAudienceIds] = useState("");
  const [retriesVal, setRetriesVal] = useState();
  const [name, setName] = useState("");

  console.log(retriesVal);
  const checkQueryAndCampData = indvQuery && campaignData.length > 0;

  function sendSelectedValAgent(val) {
    console.log("Agent***************", val);
    setAgentId(val.id);
  }

  function sendSelectedValAudience(val) {
    console.log("Audience***************", val);
    setAudienceIds(val.id);
  }

  function getAgnetList() {
    fetch(`${baseUrl}/agents/get_agent_list`, {
      headers,
    })
      .then((response) => response.json())
      .then((data) => {
        setAgentList(data);
      });
  }

  function getAudienceList() {
    fetch(`${baseUrl}/audiences/get_audience_list`, {
      headers,
    })
      .then((response) => response.json())
      .then((data) => {
        setAudienceList(data);
      });
  }
  console.log({
    agent_id: agentId,
    audience_list: audienceIds,
    name: name,
    retries: retriesVal,
  });
  useEffect(() => {
    dispatch(
      setCampaignOptions({
        agent_id: agentId,
        audience_list: audienceIds,
        name: name,
        retries: retriesVal,
      })
    );
    if (checkQueryAndCampData === undefined) {
      getAgnetList();
      getAudienceList();
    }
  }, [agentId, audienceIds]);
  console.log("audienceList", audienceList);
  return (
    <div className="flex flex-col md:flex-row justify-between px-[24px] py-[29px]">
      <div className="flex flex-col gap-[16px] pb-[50px]">
        <div className="flex justify-between sm:gap-[100px]">
          <div>Name</div>
          <div>
            <input
              type="text"
              placeholder={
                checkQueryAndCampData ? campaignData[0]?.name : "Name"
              }
              className="border px-[6px] border-black w-[210px]"
              // disabled={indvQuery?true:false}
              value={checkQueryAndCampData ? campaignData[0]?.name : name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-between sm:gap-[100px]">
          <div>Agent</div>
          <div>
            <SelectOpt
              width={{ w: "210px", sm: "210px", md: "210px", lg: "210px" }}
              defaultOption="SELECT AGENT"
              options={agentList}
              sendSelectedVal={sendSelectedValAgent}
            />
          </div>
        </div>
        <div className="flex justify-between sm:gap-[100px]">
          <div>Audiences</div>
          <div>
            <MultiSelect
              width={{ w: "210px", sm: "210px", md: "210px", lg: "210px" }}
              defaultOption="SELECT AUDIENCES"
              options={audienceList}
              sendSelectedVal={sendSelectedValAudience}
            />
          </div>
        </div>
        <div className="flex justify-between sm:gap-[100px]">
          <div>Retries</div>
          <div>
            <input
              type="number"
              placeholder="2"
              className="border px-[6px] border-black w-[210px]"
              value={retriesVal}
              onChange={(e) => {
                setRetriesVal(e.target.value);
              }}
            />
          </div>
        </div>
      </div>

      {indvQuery && (
        <div className="flex flex-col gap-[16px]">
          <div className="font-bold">Analytics</div>
          <div className="flex justify-between gap-[80px]">
            <div>Connected</div>
            <div>328</div>
          </div>
          <div className="flex justify-between gap-[80px]">
            <div>Voicebox</div>
            <div>28</div>
          </div>
          <div className="flex justify-between gap-[80px]">
            <div>Converted</div>
            <div>120</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Options;
