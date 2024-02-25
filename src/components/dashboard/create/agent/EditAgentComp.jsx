// import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import deleteIcon from "../../../../assets/icons/deleIcon.svg";
import { useDispatch, useSelector } from "react-redux";
import { baseUrl } from "../../../../utils/baseUrl";
import { useEffect, useState } from "react";
import { setResponseMessage } from "../../../../utils/slices/responseSlice";
import { toast } from "react-toastify";

const EditAgentComp = ({ sendResData }) => {
  let optionsState = useSelector((state) => state.createAgentOptions.options);
  let navigate = useNavigate();
  let [updateBtn, setUpdateBtn] = useState(false);
  let [agentCreatedId, setAgentCreatedId] = useState(null);
  const dispatch = useDispatch();
  // console.log("optionsStateEDIT", optionsState);
  dispatch(setResponseMessage(""));

  let { search } = useLocation();
  let querySearch = search?.split("?");
  let indvQuery = querySearch[1];
  let agentIdfromQuery = indvQuery?.split("=").pop();
  console.log("qieryNO", agentIdfromQuery);

  function saveData() {
    // console.log("object")
    sendResData(null);
    console.log("jsonData", JSON.stringify(optionsState));
    async function saveUserOptions() {
      try {
        let token = localStorage.getItem("auth_token");

        let post = await fetch(`${baseUrl}/agents/create_agent`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(optionsState),
        });
        let res = await post.json();
        console.log("res", post);
        if (res.message) {
          toast.success(res.message);
        }
        if (res.error) {
          toast.error(res.error);
        }
        if (post.status == 400) {
          sendResData("Field Missing");
        }
        if (post.status === 201) {
          setAgentCreatedId(res.agent_id);
          console.log("agentCreatedId", agentCreatedId);
          setUpdateBtn(true);
          // dispatch(setResponseMessage("Agent Created Successfully"))
          // navigate("/dashboard/agent");
        }
        console.log("res-", res);
      } catch (e) {
        toast.error("Failed to create Agent");
        console.error(e);
      }
    }
    if (optionsState) {
      saveUserOptions();
    }
  }

  function updateHandler() {
    // /agents/update_agent
    console.log("agentCreatedId", agentCreatedId);
    console.log("jsonData", JSON.stringify(optionsState));
    async function saveUserOptions() {
      try {
        let token = localStorage.getItem("auth_token");

        let post = await fetch(
          `${baseUrl}/agents/update_agent?agent_id=${agentCreatedId}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(optionsState),
          }
        );
        let res = await post.json();
        if (res.message) {
          toast.success(res.message);
        }
        if (res.error) {
          toast.error(res.error);
        }
        console.log("res", post);
        if (post.status == 400) {
          sendResData("Field Missing");
          // setUpdateBtn(true);
        }
        if (post.status === 201) {
          // dispatch(setResponseMessage("Agent Updated Successfully"));

          navigate('/dashboard/agent')
        }
        console.log("res-", res);
      } catch (e) {
        toast.error("Failed to Update Agent");
        console.error(e);
      }
    }
    if (optionsState) {
      saveUserOptions();
    }
  }

  useEffect(() => {
    setAgentCreatedId(agentIdfromQuery);
    // dispatch(setResponseMessage())
  }, []);
  console.log("agentCreatedId", agentCreatedId);
  return (
    <div>
      <div className="w-full flex px-[24px] py-[29px] items-center flex-wrap gap-[20px] justify-between border border-b-[#381E50]">
        <div className="flex gap-[20px] sm:gap-[35px] flex-wrap items-center ">
          <div className="flex font-bold text-[#381E50] gap-[12px] items-center">
            <div>
              {optionsState?.name == "null" || optionsState?.name?.length < 1
                ? "Agent Name"
                : optionsState?.name}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-[15px]">
          {updateBtn === true || agentIdfromQuery ? (
            <button
              disabled={optionsState ? false : true}
              onClick={updateHandler}
              className={` py-[3px] px-[25px] items-center ${
                optionsState
                  ? "bg-[#381E50] cursor-pointer"
                  : "bg-red-400 cursor-not-allowed"
              } text-white  text-md font-bold`}
            >
              {optionsState ? "Update" : "Select all the below field"}
            </button>
          ) : (
            <button
              disabled={optionsState ? false : true}
              onClick={saveData}
              className={` py-[3px] px-[25px] items-center ${
                optionsState
                  ? "bg-[#381E50] cursor-pointer"
                  : "bg-red-400 cursor-not-allowed"
              } text-white  text-md font-bold`}
            >
              {optionsState ? "Save" : "Select all the below field"}
            </button>
          )}
          {/* <button>
            <img src={deleteIcon} alt="deleteIcon" />
          </button> */}
          <Link to={`/dashboard/agent`}>
            <button className=" py-[3px]  items-center text-[#381E50]  text-md font-bold">
              X
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EditAgentComp;
