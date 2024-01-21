// import React from "react";

import Action from "./Action";
import Filter from "./Filter";

const Audiences = () => {
  return (
    <div className="w-full">
      <Filter />
      <Action/>
      <div className="overflow-auto">
        <table className="w-full table-auto ">
          <thead className="items-center border border-[#381E50]">
            <tr>
              <th className="text-base border border-[#381E50] font-bold  text-[#381E50]">
                ID
              </th>
              <th className="text-base border border-[#381E50] font-bold text-[#381E50]">
                Name
              </th>
              <th className="text-base border border-[#381E50] font-bold text-[#381E50]">
                Date
              </th>
              <th className="text-base border border-[#381E50] font-bold text-[#381E50]">
                Recipients
              </th>
             
              
              <th className="pt-[3px]">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  value=""
                  className="w-[28px] h-[28px] form-checkbox accent-[#433456] text-[#433456]  bg-gray-100 border-gray-300 rounded focus:ring-[#43345661] dark:focus:ring-[#433456] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
              </th>
            </tr>
          </thead>
          <tbody className="text-center border border-[#381E50]">
            <tr className="border border-[#381E50]">
              <td className="border border-[#381E50]">CK323</td>
              <td className="border border-[#381E50]">Real-Estate-UK</td>
              <td className="border border-[#381E50]">12.04.2023</td>
              <td className="border border-[#381E50]">800</td>
              <td className="pt-[4px]">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  value=""
                  className="w-[28px] h-[28px] form-checkbox accent-[#433456] text-[#433456]  bg-gray-100 border-gray-300 rounded focus:ring-[#43345661] dark:focus:ring-[#433456] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
              </td>
            </tr>
            <tr className="border border-[#381E50]">
              <td className="border border-[#381E50]">CK323</td>
              <td className="border border-[#381E50]">Real-Estate-UK</td>
              <td className="border border-[#381E50]">12.04.2023</td>
              <td className="border border-[#381E50]">800</td>

              <td className="pt-[4px]">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  value=""
                  className="w-[28px] h-[28px] form-checkbox accent-[#433456] text-[#433456]  bg-gray-100 border-gray-300 rounded focus:ring-[#43345661] dark:focus:ring-[#433456] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
              </td>
            </tr>
            <tr className="border border-[#381E50]">
              <td className="border border-[#381E50]">CK323</td>
              <td className="border border-[#381E50]">Real-Estate-UK</td>
              <td className="border border-[#381E50]">12.04.2023</td>
              <td className="border border-[#381E50]">800</td>

              <td className="pt-[4px]">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  value=""
                  className="w-[28px] h-[28px] form-checkbox accent-[#433456] text-[#433456]  bg-gray-100 border-gray-300 rounded focus:ring-[#43345661] dark:focus:ring-[#433456] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Audiences;
