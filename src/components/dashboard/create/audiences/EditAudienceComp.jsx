// import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../../../../utils/baseUrl";
import { useEffect, useState } from "react";

const EditAudienceComp = () => {
  let {fileType}= useParams() 
  console.log("fileType",fileType)
  let navigate = useNavigate()
  let jsonFileData = useSelector((state) => state.fileLoader.json);
  let csvFileData = useSelector((state) => state.fileLoader.csv);
  let [res, setRes] = useState();
  let [messPopUp, setMessPopUp] = useState(true);
  console.log("jsonData", jsonFileData);
  console.log("csvData", csvFileData);

  const [csvJsonData, setCsvJsonData] = useState({ contacts: [], name: "" });


  
  useEffect(() => {
    const convertedData = convertToJSON(csvFileData);
    setCsvJsonData(convertedData);
  }, [csvFileData]);

  const audienceName = useSelector((state) => state.fileLoader.audienceName);
  
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

 
  function saveData() { 
    let dataToSend;

    switch (fileType) {
      case "json":
        dataToSend = JSON.stringify(jsonFileData[0]);
        break;
      case "csv":
        dataToSend = JSON.stringify(csvJsonData);
        break;
      default:
        // Handle default case
        break;
    }
    // console.log("object")
    // console.log("JsonData", JSON.stringify(jsonFileData[0]));
    console.log("csvData", JSON.stringify(csvJsonData));
    async function saveUserOptions() {
      try {
        let post = await fetch(`${baseUrl}/audiences/create_audience`, {
          method: "POST",
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYWJkdWwifQ.QRyeI86pVtG8vJuQCWM-l0mAbC6IAUrp8ppcD7gzHBc",
            "Content-Type": "application/json",
          },
          
            // body: JSON.stringify(jsonFileData[0])
            body: dataToSend
          
          // body: JSON.stringify(csvJsonData),
        });
        let res = await post.json();
        setRes(res);

        setTimeout(() => {
          setMessPopUp(false);
        }, 4000);
        console.log("res-", res);
        if(post.status === 201){
          navigate('/dashboard/audience')
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
            <div>Create Audience</div>
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
          <button
            className=" py-[3px] px-[25px] items-center bg-[#381E50] text-white  text-md font-bold"
            onClick={saveData}
          >
            Save
          </button>

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
