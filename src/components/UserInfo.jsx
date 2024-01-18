import React, { useState, useEffect } from "react";

const UserInfo = () => {
  const [activeDivIndex, setActiveDivIndex] = useState(0);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (activeDivIndex < 4) {
        setActiveDivIndex((prevIndex) => prevIndex + 1);
      }
    } else if (e.key === "Backspace") {
      if (activeDivIndex > 0) {
        setActiveDivIndex((prevIndex) => prevIndex - 1);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [activeDivIndex]);

  const renderDiv = (index, content) => (
    <div
      key={index}
      className={`fixed top-0 left-0 w-full h-full flex items-center justify-center transition-transform duration-500 ${
        activeDivIndex === index ? "" : "transform translate-x-full"
      }`}
    >
      <div className="flex flex-col ml-[39px] items-start gap-[12px]">
        {content}
        <div className="w-[70vw] md:w-[50vw] lg:w-[460px]">
          <div className="flex justify-between">
            <div>
              <span className="text-zinc-500 text-[12px] font-normal leading-[8.80px]">
                Press{" "}
              </span>
              <span className="text-zinc-500 text-[12px] font-bold leading-[8.80px]">
                Enter
              </span>
            </div>
            <div>
              {activeDivIndex > 0 && (
                <button
                  className="w-[70px]  bg-white border text-[#71717a] border-[#e4e4e473 rounded-md]"
                  onClick={() =>
                    setActiveDivIndex((prevIndex) => prevIndex - 1)
                  }
                >
                  Back
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative">
      {renderDiv(
        0,
        <>
          <div className="text-black text-lg font-normal leading-tight tracking-tight">
            Phone
          </div>
          <div>
            <input
              className={`w-[70vw] md:w-[50vw] rounded-sm lg:w-[425px]  h-[50px] p-3 border border-gray-500`}
              type="number"
              placeholder="123456789"
            />
          </div>
        </>
      )}

      {renderDiv(
        1,
        <>
          <div className="text-black text-lg font-normal leading-tight tracking-tight">
            Full Name
          </div>
          <div>
            <input
              className={`w-[70vw] md:w-[50vw] rounded-sm lg:w-[460px]  h-[50px] p-3 border border-gray-500`}
              type="text"
              placeholder="John Smith"
            />
          </div>
        </>
      )}

      {renderDiv(
        2,
        <>
          <div className="text-black text-lg font-normal leading-tight tracking-tight">
            Designation
          </div>
          <div>
            <input
              className={`w-[70vw] md:w-[50vw] rounded-sm lg:w-[460px]  h-[50px] p-3 border border-gray-500`}
              type="text"
              placeholder="Data Science"
            />
          </div>
        </>
      )}

      {renderDiv(
        3,
        <>
          <div className="text-black text-lg font-normal leading-tight tracking-tight">
            Which of the following does your company do currently?
          </div>
          <div>
            <div className="flex flex-col gap-[12px]">
              <div className="flex items-center">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  value=""
                  className="w-[28px] h-[28px] text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="default-checkbox"
                  className="ms-2 w-[70vw] md:w-[50vw] rounded-sm lg:w-[425px] py-[4px] px-[6px] border border-gray-500  text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Robo-Calling
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="checked-checkbox"
                  type="checkbox"
                  value=""
                  className="w-[28px] h-[28px] text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="checked-checkbox"
                  className="ms-2 w-[70vw] md:w-[50vw] rounded-sm lg:w-[425px] py-[4px] px-[6px] border border-gray-500  text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Outbound Sales Calls
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="checked-checkbox"
                  type="checkbox"
                  value=""
                  className="w-[28px] h-[28px] text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="checked-checkbox"
                  className="ms-2 w-[70vw] md:w-[50vw] rounded-sm lg:w-[425px] py-[4px] px-[6px] border border-gray-500  text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Inbound Sales Calls
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="checked-checkbox"
                  type="checkbox"
                  value=""
                  className="w-[28px] h-[28px] text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="checked-checkbox"
                  className="ms-2 w-[70vw] md:w-[50vw] rounded-sm lg:w-[425px] py-[4px] px-[6px] border border-gray-500  text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Customer Support Calls
                </label>
              </div>
            </div>
          </div>
        </>
      )}

      {renderDiv(
        4,
        <>
          <div className="text-black text-lg font-normal leading-tight tracking-tight">
            Do your company have a dev team?
          </div>
          <div>
            <div className="flex flex-col gap-[12px]">
              <div className="flex items-center">
                <input
                  id="dev-team-yes"
                  type="checkbox"
                  name="dev-team"
                  value=""
                  className="w-[28px] h-[28px] text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="dev-team-yes"
                  className="ms-2 w-[70vw] md:w-[50vw] rounded-sm lg:w-[425px] py-[4px] px-[6px] border border-gray-500  text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  YES
                </label>
              </div>
              <div className="flex items-center">
                <input
                  name="dev-team"
                  id="dev-team-no"
                  type="checkbox"
                  value=""
                  className="w-[28px] h-[28px] text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="dev-team-no"
                  className="ms-2 w-[70vw] md:w-[50vw] rounded-sm lg:w-[425px] py-[4px] px-[6px] border border-gray-500  text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  NO
                </label>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserInfo;
