import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCheckboxState,
  addDataTable,
} from "../../../utils/slices/dashboardSlice";
// import React from 'react'

const DashboardTable = ({ maxTableHeaders }) => {
  const [check, setCheck] = useState([]);
  let dashboadTable = useSelector((state) => state.dashboard.table);
  let checkState = useSelector((state) => state.dashboard.checkBox);
  let dispatch = useDispatch();
  const allIds = dashboadTable?.map((e) => e.audience_id);

  // console.log(allIds)
  // console.log(maxTableHeaders);
  // console.log(dashboadTable);


  // console.log(allIds?.length === check.length);
  // console.log(maxTableHeaders?"hello":"no data");

  useEffect(() => {
    dispatch(addCheckboxState(check));
  }, [check]);

  // console.log(allIds?.length, " ", checkState?.length);
  function checkedHandler(e) {
    let isChecked = e.target.checked;
    let value = e.target.value;
    // console.log([ value]);
    if (isChecked) {
      setCheck([...check, value]);
    } else {
      setCheck(check.filter((e) => e !== value));
    }
  }

  function checkAllHandler(e) {
    let isChecked = e.target.checked;
    if (isChecked) {
      setCheck(allIds);
    } else {
      setCheck([]);
    }
  }
  // console.log(check);

  return (
    <div className="overflow-auto">
      <table className="w-full table-auto ">
        <thead className="items-center border border-[#381E50]">
          {maxTableHeaders ? (
            <tr>
              {maxTableHeaders.map((e, i) => {
                return (
                  <th
                    className="text-base border border-[#381E50] font-bold  text-[#381E50]"
                    key={i}
                  >
                    {e.charAt(0).toUpperCase() + e.slice(1)}
                  </th>
                );
              })}

              <th key={maxTableHeaders?.length} className="pt-[3px]">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  value=""
                  checked={
                    dashboadTable !== null
                      ? checkState?.length === dashboadTable?.length
                        ? dashboadTable.map(
                            (e) =>
                              checkState.includes(e.audience_id) &&
                              checkState?.length === dashboadTable?.length
                          )
                        : false
                      : false
                  }
                  onChange={checkAllHandler}
                  className="w-[28px] h-[28px] form-checkbox accent-[#433456] text-[#433456]  bg-gray-100 border-gray-300 rounded focus:ring-[#43345661] dark:focus:ring-[#433456] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
              </th>
            </tr>
          ) : (
            <tr>
              <th>No-data</th>
            </tr>
          )}
        </thead>
        <tbody  className="text-center border border-[#381E50]">
          {dashboadTable === null || maxTableHeaders === undefined ? (
            <tr>
              <td>No-data</td>
            </tr>
          ) : (
            dashboadTable.map((e, i) => {
              return (
                <tr key={e.id} className="border border-[#381E50]">
                  {maxTableHeaders.map((header) => {
                    return (
                      <td
                        className="border border-[#381E50]"
                        key={`${i}-${header}`}
                      >
                        {e[header]}
                      </td>
                    );
                  })}
                  <td key={`${i}-checkbox`} className="pt-[4px]">
                    <input
                      type="checkbox"
                      name=""
                      value={e.audience_id}
                      checked={check.includes(e.audience_id)}
                      onChange={checkedHandler}
                      className="w-[28px] h-[28px] form-checkbox accent-[#433456] text-[#433456]  bg-gray-100 border-gray-300 rounded focus:ring-[#43345661] dark:focus:ring-[#433456] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardTable;
