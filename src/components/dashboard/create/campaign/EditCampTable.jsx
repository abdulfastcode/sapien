import React, { useEffect } from "react";

const EditCampTable = ({indvQuery}) => {
  
  return (
    <>
      <div className="w-full h-[40vh] lg:h-[47vh] relative">
        <div className="overflow-auto border-t border-t-[#381e50] h-full w-full relative">
          <table className="w-full table-auto border overflow-auto">
            <thead className="items-center border-t-0 border border-[#381E50] sticky top-0 bg-white drop-shadow-md">
              <tr>
                <th className="text-base border border-[#381E50] font-bold  text-[#381E50]">
                  ID
                </th>
                <th className="text-base border border-[#381E50] font-bold text-[#381E50]">
                  Phone
                </th>
                <th className="text-base border border-[#381E50] font-bold text-[#381E50]">
                  Call Date Time
                </th>
                <th className="text-base border border-[#381E50] font-bold text-[#381E50]">
                  Connected
                </th>
                <th className="text-base border border-[#381E50] font-bold text-[#381E50]">
                  Voicebox
                </th>
                <th className="text-base border border-[#381E50] font-bold text-[#381E50]">
                  Converted
                </th>
                <th className="text-base border border-[#381E50] font-bold text-[#381E50]">
                  Summary
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
                <td className="border border-[#381E50]">9837441234</td>
                <td className="border border-[#381E50]">12.04.2023</td>
                <td className="border border-[#381E50]">YES</td>
                <td className="border border-[#381E50]">YES</td>
                <td className="border border-[#381E50]">NO</td>
                <td className="border border-[#381E50]">
                  Went straight to voicebox.
                </td>
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
                <td className="border border-[#381E50]">9837441234</td>
                <td className="border border-[#381E50]">12.04.2023</td>
                <td className="border border-[#381E50]">YES</td>
                <td className="border border-[#381E50]">YES</td>
                <td className="border border-[#381E50]">NO</td>
                <td className="border border-[#381E50]">
                  Went straight to voicebox.
                </td>
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
                <td className="border border-[#381E50]">9837441234</td>
                <td className="border border-[#381E50]">12.04.2023</td>
                <td className="border border-[#381E50]">YES</td>
                <td className="border border-[#381E50]">YES</td>
                <td className="border border-[#381E50]">NO</td>
                <td className="border border-[#381E50]">
                  Went straight to voicebox.
                </td>
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
                <td className="border border-[#381E50]">9837441234</td>
                <td className="border border-[#381E50]">12.04.2023</td>
                <td className="border border-[#381E50]">YES</td>
                <td className="border border-[#381E50]">YES</td>
                <td className="border border-[#381E50]">NO</td>
                <td className="border border-[#381E50]">
                  Went straight to voicebox.
                </td>
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
          {/* <div className="hidden sm:flex w-full h-[66px] px-[24px] justify-end items-center border bg-white border-[#433456] sticky  bottom-0">
            <button className="border border-[#381E50] py-1 px-4">Pause</button>
          </div> */}
        </div>
        {/* <div className="flex sm:hidden w-full h-[66px] px-[24px] justify-end items-center border bg-white border-[#433456] sticky  bottom-0">
          <button className="border border-[#381E50] py-1 px-4">Pause</button>
        </div> */}
      </div>
    </>
  );
};

export default EditCampTable;
