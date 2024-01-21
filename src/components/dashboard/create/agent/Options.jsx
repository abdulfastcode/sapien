import React, { useRef } from "react";
import deleteIcon from "../../../../assets/icons/deleIcon.svg";
import playIcon from "../../../../assets/icons/Play.svg";
import downloadIcon from "../../../../assets/icons/Download.svg";

const Options = () => {
  let agentName = useRef(null);
  return (
    <div className="w-full py-[20px] px-[24px] lg:w-[40%] flex flex-col gap-[30px]">
      <div className="flex justify-between ">
        <div>Name</div>
        <div>
          <input
            type="text"
            placeholder="Real-Estate-Hindi"
            ref={agentName}
            className="border px-[6px] border-black w-[210px]"
          />
        </div>
      </div>
      <div className="flex justify-between ">
        <div>Voice </div>
        <div>
          <select className="border px-[6px] border-black w-[210px]">
            <option value="">Vladimir-Putin</option>
            <option value="">Vladimir-Putin</option>
            <option value="">Vladimir-Putin</option>
          </select>
        </div>
      </div>
      <div className="flex justify-between ">
        <div>Conversion</div>
        <div>
          <div className="flex  gap-[10px] pb-[15px]">
            <select className="border border-black" name="" id="">
              <option value="">OR</option>
              <option value="">OR</option>
            </select>
            <select name="" id="" className="border border-black">
              <option value="">Custom Interest 2</option>
              <option value="">Custom Interest 2</option>
            </select>
          </div>

          <div className="flex pb-[15px]  gap-[10px]">
            <select className="border border-black" name="" id="">
              <option value="">OR</option>
              <option value="">OR</option>
            </select>
            <select name="" id="" className="border border-black  w-[155px]">
              <option value="">Custom Interest </option>
              <option value="">Custom Interest </option>
            </select>
          </div>
          <div>
            <input
              type="button"
              value="+ Add Condition"
              className="cursor-pointer border ml-[55px] px-4 border-black bg-[#D7C9FF]"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-[20px]">
        <div className="pb-2 text-[#7B777E]">Agent </div>
        <div className="flex justify-between ">
          <div>Call From </div>

          <div>
            <select className="border px-[6px] border-black w-[155px]">
              <option value="">+1 9213234232</option>
            </select>
          </div>
        </div>
        <div className="flex justify-between ">
          <div>Call To </div>

          <div className="flex flex-col gap-[20px]">
            <div className="flex gap-[10px]">
              <select className="border px-[6px] border-black ">
                <option value="">IN</option>
              </select>
              <select className="border px-[6px] border-black w-[155px]">
                <option value="">9213234232</option>
              </select>
            </div>
            <div className="text-right">
              <button className="border bg-[#381E50] border-[#381E50] text-white py-2 px-4">
                Test Call
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-[20px]">
        <div className="pb-2 text-[#7B777E]">Old Recordings </div>
        <div className="flex justify-between ">
          <div>29.03.2023 17:55:56 </div>

          <div className="flex gap-[18px]">
            <div>
              <img src={playIcon} alt="" />
            </div>
            <div>
              <img src={downloadIcon} alt="" />
            </div>
            <div>
              <img src={deleteIcon} alt="" />
            </div>
          </div>
        </div>
        <div className="flex justify-between ">
          <div>29.03.2023 17:55:56 </div>

          <div className="flex gap-[18px]">
            <div>
              <img src={playIcon} alt="" />
            </div>
            <div>
              <img src={downloadIcon} alt="" />
            </div>
            <div>
              <img src={deleteIcon} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Options;
