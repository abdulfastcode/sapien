import React, { useEffect, useState } from "react";
import { baseUrl } from "../../utils/baseUrl";

const Payment = () => {
  const [userDetails,setUserDetails] = useState(null)
  useEffect(()=>{
    
    let token = localStorage.getItem("auth_token");
    fetch(`${baseUrl}/accounts/get_account_details`, {
      headers: {
        Authorization:
          `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data perso Data",data)
        setUserDetails(data);
        // dispatch(addDataTable(data));
      });
  },[])
  return (
    <div className="w-full">
      <div
        className="border-b p-4 border-b-[#433456] font-bold text-[#433456]
] "
      >
        Payments
      </div>
      <div className="w-80 flex flex-col gap-2 p-4">
        <div className="flex justify-between text-[#433456]">
          <div>Remaining Credits</div>
          <div>{userDetails?userDetails.credits:""}</div>
        </div>
        <div className="flex justify-between text-[#433456]">
          <div>Cost/Min</div>
          <div>{userDetails?userDetails.cost_per_min:""}</div>
        </div>
        <div className="flex justify-between text-[#433456]">
          <div>Remaining Talk Time</div>
          <div>{userDetails?userDetails.remaining_talk_time:""}</div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
