import React, { useEffect, useState } from "react";
import { baseUrl } from "../../utils/baseUrl";

const Payment = () => {
  const [userDetails, setUserDetails] = useState(null);
  useEffect(() => {
    let token = localStorage.getItem("auth_token");
    fetch(`${baseUrl}/accounts/get_account_details`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data perso Data", data);
        setUserDetails(data);
        // dispatch(addDataTable(data));
      });
  }, []);
  console.log("userDetails", userDetails);
  return (
    <div className="w-full">
      <div
        className="border-b p-4 pr-[80px] flex justify-between border-b-[#433456] font-bold text-[#433456]
] "
      >
        Payments
        <div>{userDetails?.main_user_id}</div>
      </div>
      <div className="w-[100vw] md:w-[60vw] lg:w-[30vw] flex flex-wrap flex-col gap-2 p-4">
        <div className="flex justify-between text-[#433456]">
          <div>Remaining Credits</div>
          <div>{userDetails ? Number(userDetails.credits.toFixed(3)) : ""}</div>
        </div>
        <div className="flex justify-between text-[#433456]">
          <div>Cost/Min</div>
          <div>{userDetails ? userDetails.cost_per_min : ""}</div>
        </div>
        <div className="flex justify-between text-[#433456]">
          <div>Remaining Talk Time</div>
          <div>{userDetails ? userDetails.remaining_talk_time : ""}</div>
        </div>
        <div className="mt-2">
          <a href="https://payments.cashfree.com/forms/add-sapien-credits" target="_blank" rel="noreferrer" className=" py-[3px] px-[25px] items-center bg-[#381E50] text-white  text-md ">
            Add Credit
          </a>
        </div>
      </div>
    </div>
  );
};

export default Payment;
