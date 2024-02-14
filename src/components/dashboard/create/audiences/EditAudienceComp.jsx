// import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { baseUrl } from "../../../../utils/baseUrl";
import { useState } from "react";

const EditAudienceComp = () => {
  let jsonFileData = useSelector((state) => state.fileLoader.json);
  let [res, setRes] = useState();
  let [messPopUp, setMessPopUp] = useState(true);
  function saveData() {
    // console.log("object")
    console.log("jsonData", JSON.stringify(jsonFileData[0]));
    async function saveUserOptions() {
      try {
        let post = await fetch(`${baseUrl}/audiences/create_audience`, {
          method: "POST",
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYWJkdWwifQ.QRyeI86pVtG8vJuQCWM-l0mAbC6IAUrp8ppcD7gzHBc",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(jsonFileData[0]),
        });
        let res = await post.json();
        setRes(res);
        
        setTimeout(() => {
          setMessPopUp(false)
        }, 4000);
        console.log("res-", res);
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
        {res&&
        <div
          className={`p-4 ${messPopUp?"block":"hidden"} text-white ${
            res?.error ? "bg-red-500 " : "bg-green-600"
          }`}
        >
          {res?.error ? res?.error : res?.message}
        </div>}
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
