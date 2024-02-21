import React from "react";
import { useLocation } from "react-router-dom";

const Text = ({ callScript, changeText }) => {
  
  let { search } = useLocation();
  let querySearch = search?.split("?");
  let indvQuery = querySearch[1];
  let agentIdfromQuery = indvQuery?.split("=").pop();
  console.log("agentIdfromQuery!!@!@!@!@@!@!@!", agentIdfromQuery);

  return (
    <div className="w-full lg:w-[60%] lg:min-h-[calc(100vh-154.64px)] bg-[#22182A]">
      {/* <div className="mt-[25px] ">
        <div className="text-white mb-[10px]  ml-[45px]">
          System Instructions
        </div>
        <div className="bg-[#381E50] w-[90%] px-[19px] py-[8px] m-auto  text-white">
          You are a telephone caller salesperson from Vakilsearch named
          Sudarshan. You do not respond as 'User' or pretend to be 'User'. You
          only respond as Sudarshan. You only reply on the basis of the
          following Context, Rules, Objections and Qualifying Questions
          mentioned below about Vakilsearch. You have called a customer(the
          customer hasn't called you) who wanted to buy GST Registration with
          Vakilsearch, but did not proceed. You need to understand if he is
          still interested in getting the GST Regis
        </div>
      </div> */}
      <div className="mt-[45px] mb-[25px] h-[78%]">
        <div className="text-white mb-[10px]  ml-[45px]">Call Script</div>
        <textarea
          onChange={(e) => {
            changeText(e.target.value)
            // console.log(e.target.value);
          }}
          value={callScript ?  callScript?.script : "Script"}
          className="bg-[#381E50] w-[83%] ml-[43px] h-full px-[19px] py-[8px]  text-white"
        >
          {callScript != null ? callScript?.script : "Loading..."}
        </textarea>
      </div>
    </div>
  );
};

export default Text;
