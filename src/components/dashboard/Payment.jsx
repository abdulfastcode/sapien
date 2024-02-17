import React from "react";

const Payment = () => {
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
          <div>32 USD</div>
        </div>
        <div className="flex justify-between text-[#433456]">
          <div>Cost/Min</div>
          <div>0.1 USD</div>
        </div>
        <div className="flex justify-between text-[#433456]">
          <div>Remaining Talk Time</div>
          <div>300 Hours</div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
