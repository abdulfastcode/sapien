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
  const [retriesVal, setRetriesVal] = useState(1);
  const [name, setName] = useState("");

  console.log("campaignData", campaignData);
  const checkQueryAndCampData = indvQuery && campaignData.length > 0;
  console.log("checkQueryAndCampData", checkQueryAndCampData);
  function sendSelectedValAgent(val) {
    console.log("Agent***************", val);
    setAgentId(val.id);
  }

  function sendSelectedValAudience(val) {
    console.log("Audience***************", val);
    setAudienceIds(val.id);
  }

  function getAgnetList() {
    let token = localStorage.getItem("auth_token");
    fetch(`${baseUrl}/agents/get_agent_list?items=20000&page=1`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setAgentList(data);
      });
  }

  function getAudienceList() {
    let token = localStorage.getItem("auth_token");
    fetch(`${baseUrl}/audiences/get_audience_list?items=20000&page=1`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
  }, [agentId, audienceIds, retriesVal, name]);
  console.log("audienceList", audienceList);
  return (
    <div className="flex flex-col md:flex-row justify-between px-[24px] py-[29px]">
      <div className="flex flex-col gap-[16px] pb-[50px]">
        <div className="flex justify-between sm:gap-[100px]">
          <div>Name</div>
          <div>
            <input
              type="text"
              disabled={campaignData.length > 0 ? true : false}
              placeholder={
                campaignData.length > 0 ? campaignData[0]?.name : "Name"
              }
              className="border px-[6px]  border-black w-[210px]"
              // disabled={indvQuery?true:false}
              value={campaignData.length > 0 ? campaignData[0]?.name : name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-between sm:gap-[100px]">
          <div>Agent</div>
          <div>
            {campaignData.length > 0 ? (
              <div className="border px-[6px]  border-black w-[210px]">
                {campaignData[0]?.agent_id}
              </div>
            ) : (
              <SelectOpt
                optionName={
                  campaignData.length > 0
                    ? "Cannot Select Option"
                    : "Select Agent"
                }
                width={{ w: "210px", sm: "210px", md: "210px", lg: "210px" }}
                defaultOption={
                  campaignData.length > 0
                    ? campaignData[0]?.agent_id
                    : "Select Agent"
                }
                options={campaignData.length > 0 ? [] : agentList}
                sendSelectedVal={sendSelectedValAgent}
              />
            )}
          </div>
        </div>
        <div className="flex justify-between sm:gap-[100px]">
          <div>Audiences</div>
          <div>
            {campaignData.length > 0 ? (
              <div className="border px-[6px]  border-black w-[210px]">{`${campaignData[0]?.audience_list.length}-SELECTED`}</div>
            ) : (
              <MultiSelect
                optionName={
                  campaignData.length > 0
                    ? "Cannot Select Option"
                    : "Select Audiences"
                }
                width={{ w: "210px", sm: "210px", md: "210px", lg: "210px" }}
                defaultOption={
                  campaignData.length > 0
                    ? `${campaignData[0]?.audience_list.length} SELECTED`
                    : "Select Audiences"
                }
                options={campaignData.length > 0 ? [] : audienceList}
                sendSelectedVal={sendSelectedValAudience}
              />
            )}
          </div>
        </div>
        <div className="flex justify-between sm:gap-[100px]">
          <div>Retries</div>
          <div>
            <input
              type="number"
              placeholder={
                campaignData.length > 0 ? campaignData[0]?.retries : "Retries"
              }
              disabled={campaignData.length > 0 ? true : false}
              className="border px-[6px] border-black w-[210px]"
              value={retriesVal}
              onChange={(e) => {
                setRetriesVal(e.target.value);
              }}
            />
          </div>
        </div>
      </div>

      {campaignData.length > 0 && (
        <div className="flex flex-col gap-[16px] pr-[15px]">
          <div className="font-bold">Analytics</div>
          <div className="flex justify-between gap-[80px]">
            <div>Called</div>
            <div>{campaignData[0]?.called}</div>
          </div>
          <div className="flex justify-between gap-[80px]">
            <div>Connected</div>
            <div>{campaignData[0]?.connected}</div>
          </div>
          <div className="flex justify-between gap-[80px]">
            <div>Converted</div>
            <div>{campaignData[0]?.converted}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Options;
