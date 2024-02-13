import React from "react";


const Text = ({callScript}) => {
 
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
      <div className="mt-[45px] mb-[25px]">
        <div className="text-white mb-[10px]  ml-[45px]">Call Script</div>
        <div className="bg-[#381E50] w-[90%]  px-[19px] py-[8px] m-auto  text-white">
          {callScript != null ? callScript.script : "Loading..."}
        </div>
      </div>
    </div>
  );
};

export default Text;
