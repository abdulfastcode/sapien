import React from "react";

const Options = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between px-[24px] py-[29px]">
      <div className="flex flex-col gap-[16px] pb-[50px]">
        <div className="flex justify-between sm:gap-[100px]">
          <div>Name</div>
          <div>
            <input
              type="text"
              placeholder="Real-Estate-Hindi"
              className="border px-[6px] border-black w-[210px]"
            />
          </div>
        </div>
        <div className="flex justify-between sm:gap-[100px]">
          <div>Agent</div>
          <div>
            <input
              type="text"
              placeholder="Real-Estate-Hindi"
              className="border px-[6px] border-black w-[210px]"
            />
          </div>
        </div>
        <div className="flex justify-between sm:gap-[100px]">
          <div>Audiences</div>
          <div>
            <select className="border px-[6px] border-black w-[210px]" name="" id="">
                <option  value="">3 Selected</option>
            </select>
          </div>
        </div>
        <div className="flex justify-between sm:gap-[100px]">
          <div>Retries</div>
          <div>
            <input
              type="text"
              placeholder="2"
              className="border px-[6px] border-black w-[210px]"
            />
          </div>
        </div>
      </div>

      
      <div className="flex flex-col gap-[16px]">
        <div className="font-bold">Analytics</div>
        <div className="flex justify-between gap-[80px]">
            <div>Connected</div>
            <div>328</div>
        </div>
        <div className="flex justify-between gap-[80px]">
            <div>Voicebox</div>
            <div>28</div>
        </div>
        <div className="flex justify-between gap-[80px]">
            <div>Converted</div>
            <div>120</div>
        </div>
      </div>
    </div>
  );
};

export default Options;
