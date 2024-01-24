import { useState } from "react";
// import React from 'react'

const DashboardTable = ({ maxTableHeaders, tableData }) => {
  const [checkAll, setCheckAll] = useState(false);

  return (
    <div className="overflow-auto">
      <table className="w-full table-auto ">
        <thead className="items-center border border-[#381E50]">
          <tr>
            {maxTableHeaders.map((e, i) => {
              return (
                <th
                  className="text-base border border-[#381E50] font-bold  text-[#381E50]"
                  key={i}
                >
                  {e}
                </th>
              );
            })}

            <th className="pt-[3px]">
              <input
                onClick={(e) =>
                  e.target.checked ? setCheckAll(true) : setCheckAll(false)
                }
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
          {tableData.map((e) => {
            // console.log(e.id);
            return (
              <>
                <tr key={e.id} className="border border-[#381E50]">
                  {maxTableHeaders.map((header) => {
                    return (
                      <>
                        <td className="border border-[#381E50]" key={e["id"]}>
                          {e[header]}
                        </td>
                      </>
                    );
                  })}
                  <td key={e.id} className="pt-[4px]">
                    <input
                      type="checkbox"
                      name=""
                      onClick={(e) => e.target.checked == !true}
                      checked={checkAll ? true : onclick}
                      id=""
                      value=""
                      className="w-[28px] h-[28px] form-checkbox accent-[#433456] text-[#433456]  bg-gray-100 border-gray-300 rounded focus:ring-[#43345661] dark:focus:ring-[#433456] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardTable;
