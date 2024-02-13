import React from "react";
import { Link, useLocation } from "react-router-dom";

const Filter = () => {
  // console.log("comp mount from filter ")
  // let { create } = props;
  // console.log(create);
  // console.log("useLocation", useLocation());
  const { pathname } = useLocation();
  let finalPathName = pathname.split("/").pop();
  // console.log(finalPathName);
  return (
    <div className="w-full flex px-[24px] py-[29px] items-center flex-wrap gap-[20px] justify-between border border-b-[#381E50]">
      <div className="flex gap-[20px] sm:gap-[35px] flex-wrap items-center ">
        <div className="flex gap-[12px] items-center">
          <div>Date</div>
          <div>
            <input
              className="border-2 px-[15px] text-[#381e50a9] border-[#381E50] "
              type="date"
              name=""
              id=""
            />
          </div>
        </div>
        {pathname == "/dashboard/campaign" ? (
          <div className="flex gap-[12px] items-center">
            <div>Status</div>
            <div>
              <select
                className="border-2 pb-[1px] border-[#381E50] text-[#381e50a9] py-[1px] px-[15px] cursor-pointer "
                type=""
              
              >
                <option value="">In-progress</option>
                <option value="">Completed</option>
                <option value="">Not Started</option>
              </select>
            </div>
          </div>
        ) : (
          ""
        )}
        <div>
          <input
            className="border-2 border-[#381E50] text-[#381e50a9] py-[1px] px-[15px] cursor-pointer "
            type="button"
            value="Clear Filters"
          />
        </div>
      </div>
      <div>
        <Link to={`/dashboard/${finalPathName}/create`}>
          <button className=" py-[3px] px-[25px] items-center bg-[#381E50] text-white text-md font-bold">
            Create
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Filter;
