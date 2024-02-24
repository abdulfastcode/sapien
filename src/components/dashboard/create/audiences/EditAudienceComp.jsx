// import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../../../../utils/baseUrl";
import { useEffect, useState } from "react";

const EditAudienceComp = () => {
  let { search } = useLocation();
  let querySearch = search?.split("?");
  let indvQuery = querySearch[1];
  let audienceIdfromQuery = indvQuery?.split("=").pop();
  console.log("audienceIdfromQuery", audienceIdfromQuery);

  let { fileType } = useParams();
  console.log("fileType", fileType);
  let navigate = useNavigate();
  let jsonFileData = useSelector((state) => state.fileLoader.json);
  let csvFileData = useSelector((state) => state.fileLoader.csv);
  let [res, setRes] = useState();
  let [messPopUp, setMessPopUp] = useState(true);
  const audienceName = useSelector((state) => state.fileLoader.audienceName);
  console.log("jsonData", jsonFileData);
  console.log("csvData", csvFileData);

  const [csvJsonData, setCsvJsonData] = useState({ contacts: [], name: "" });

  useEffect(() => {
    const convertedData = convertToJSON(csvFileData);
    setCsvJsonData(convertedData);
    if (audienceIdfromQuery) {
      setCsvJsonData({ ...convertedData, audience_id: audienceIdfromQuery });
    }
  }, [csvFileData, audienceName]);
  console.log("audienceName", audienceName);

  const convertToJSON = (csvData) => {
    let contacts = [];
    let name = audienceName;

    csvData?.forEach((row) => {
      let contact = {};

      Object.keys(row).forEach((key) => {
        contact[key] = row[key];
      });

      contacts.push(contact);
    });

    return { contacts, name };
  };

  console.log("CSVcsvJsonData", csvJsonData);

  // if(fileType==="json"){
  //   setDataToSend(JSON.stringify(jsonFileData[0]))
  //   console.log("dataToSendJSon",dataToSend)
  // }

  // if(fileType==="csv"){
  //   setDataToSend(csvJsonData)
  //   console.log("dataToSendCSv",setDataToSend)
  // }
  console.log("csvData", JSON.stringify(csvJsonData));

  function saveData() {
    let dataToSend;

    switch (fileType) {
      case "json":
        dataToSend = JSON.stringify(jsonFileData[0]);
        break;
      case "csv":
        console.log("csvData", JSON.stringify(csvJsonData));
        dataToSend = JSON.stringify(csvJsonData);
        break;
      default:
        // Handle default case
        break;
    }
    // console.log("object")
    // console.log("JsonData", JSON.stringify(jsonFileData[0]));
    async function saveUserOptions() {
      try {
        let token = localStorage.getItem("auth_token");
        let post = await fetch(`${baseUrl}/audiences/create_audience`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },

          // body: JSON.stringify(jsonFileData[0])
          body: dataToSend,

          // body: JSON.stringify(csvJsonData),
        });
        let res = await post.json();
        setRes(res);

        setTimeout(() => {
          setMessPopUp(false);
        }, 4000);
        console.log("res-", res);
        if (post.status === 201) {
          navigate("/dashboard/audience");
        }
      } catch (e) {
        console.error(e);
      }
    }
    saveUserOptions();
  }

  console.log("CSVcsvJsonData", csvJsonData);
  function update() {
    let dataToSend;

    switch (fileType) {
      case "json":
        dataToSend = JSON.stringify(jsonFileData[0]);
        break;
      case "csv":
        console.log("csvData", JSON.stringify(csvJsonData));
        dataToSend = JSON.stringify(csvJsonData);
        break;
      default:
        // Handle default case
        break;
    }
    // console.log("object")
    // console.log("JsonData", JSON.stringify(jsonFileData[0]));
    async function saveUserOptions() {
      try {
        let token = localStorage.getItem("auth_token");
        let post = await fetch(`${baseUrl}/audiences/update_audience`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },

          // body: JSON.stringify(jsonFileData[0])
          body: dataToSend,

          // body: JSON.stringify(csvJsonData),
        });
        let res = await post.json();
        setRes(res);

        setTimeout(() => {
          setMessPopUp(false);
        }, 4000);
        console.log("res-", res);
        if (post.status === 201) {
          navigate("/dashboard/audience");
        }
      } catch (e) {
        console.error(e);
      }
    }
    saveUserOptions();
  }
  return (
    <div>
      <div className="w-full flex px-[24px] py-[29px] items-center flex-wrap gap-[20px] justify-between border border-b-[#381E50]">
        <div className="flex gap-[20px] sm:gap-[35px] flex-wrap items-center ">
          <div className="flex text-[#381E50] font-bold gap-[12px] items-center">
            <div>{audienceIdfromQuery?"Update Audience":"Create Audience"}</div>
          </div>
        </div>
        {res && (
          <div
            className={`p-4 ${messPopUp ? "block" : "hidden"} text-white ${
              res?.error ? "bg-red-500 " : "bg-green-600"
            }`}
          >
            {res?.error ? res?.error : res?.message}
          </div>
        )}
        <div className="flex items-center gap-[15px]">
          {fileType && !audienceIdfromQuery && (
            <button
              className=" py-[3px] px-[25px] items-center bg-[#381E50] text-white  text-md font-bold"
              onClick={saveData}
            >
              Save
            </button>
          )}
          {audienceIdfromQuery && fileType && (
            <button
              className=" py-[3px] px-[25px] items-center bg-[#381E50] text-white  text-md font-bold"
              onClick={update}
            >
              Update
            </button>
          )}

          <Link to={`/dashboard/audience`}>
            <button className=" py-[3px]  items-center text-[#381E50]  text-md font-bold">
              X
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EditAudienceComp;
