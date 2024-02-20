import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCheckboxState,
  addDataTable,
} from "../../../utils/slices/dashboardSlice";
import { useLocation } from "react-router-dom";
// import React from 'react'
 
const DashboardTable = ({ tableData, setData, maxTableHeaders }) => {
  // console.log("comp mount from DashboardTable");
  const [checkedTr, setCheckedTr] = useState(true);
  const { pathname } = useLocation(); 
  const [check, setCheck] = useState([]);
  // let dashboadTable = useSelector((state) => state.dashboard.table);
  let checkState = useSelector((state) => state.dashboard.checkBox);
  // let dispatch = useDispatch();

  const path = pathname.split("/").pop();
  console.log("path!!!",path)
  const allIds = tableData?.map((e) => {
    return e[`${path}_id`];
  });

  console.log(tableData);
  useEffect(() => {
    // dispatch(addCheckboxState([1, 2]));
    // console.log("dashboard useEfect");
    // return () => {
    //   // console.log("comp unmount from das");
    //   // dispatch(addCheckboxState(null));
    // };
    // setData([
    //   {
    //     agent_id: "2",
    //     created_on: "2024-02-07 13:47:22.697171",
    //     name: "sudarshan-test-2",
    //     voice: "test_voice",
    //     isChecked: true,
    //   },
    //   {
    //     agent_id: "3",
    //     created_on: "2024-02-07 13:47:22.697171",
    //     name: "sudarshan-test-2",
    //     voice: "test_voice",
    //     isChecked: true,
    //   },
    // ]);
  }, [check]);
  console.log(check);

  function checkedHandler(e) {
    let name = e.target.name;
    let target = e.target;
    let checked = e.target.checked;
    if (!name) {
      while (target && target.tagName !== "TR") {
        target = target.parentElement;
      }
      if (target) {
        console.log("checkedTr", checkedTr);
        setCheckedTr(!checkedTr);
        console.log("checkedTr", checkedTr);
        console.log(target);
        name = target.getAttribute("name");
        checked = checkedTr;
    
        console.log("checkedTr", checkedTr);

        // Use the 'name' value as needed
        console.log("Clicked row name:", name);
        console.log("Clicked row checked:", checked);
      }
    }

    // let value = e.target.value;
    console.log("name", name);
    console.log("checked", checked);

    // if (checked) {
    //   setCheck([...check, value]);
    // } else {
    //   setCheck(check.filter((e) => e !== value));
    // }

    if (name === "allselect") {
      const checkedValue = tableData.map((data) => {
        return { ...data, isChecked: checked };
      });
      console.log(checkedValue);
      setData(checkedValue);
    } else {
      console.log("object name", name);
      const checkedValue = tableData.map((data) =>
        data[`${path}_id`] === name ? { ...data, isChecked: checked } : data
      );
      console.log(checkedValue);
      setData(checkedValue);
    }
  }

  // function checkAllHandler(e) {
  //   let isChecked = e.target.checked;
  //   if (isChecked) {
  //     setCheck(allIds);
  //   } else {
  //     setCheck([]);
  //   }
  // }
  // console.log(setData);
  // console.log(setData);
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
                  name="allselect"
                  id=""
                  value=""
                  checked={!tableData.some((data) => data?.isChecked !== true)}
                  onChange={checkedHandler}
                  className="w-[28px] h-[28px] form-checkbox accent-[#433456] text-[#433456]  bg-gray-100 border-gray-300 rounded focus:ring-[#43345661] dark:focus:ring-[#433456] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
              </th>
            </tr>
          ) : (
            <tr>
              <th>{path==="agent"?"Agent_id":""}</th>
            </tr>
          )}
        </thead>
        <tbody className="text-center border border-[#381E50]">
          {tableData === null || maxTableHeaders === undefined ? (
            <tr>
              <td>No Data</td>
            </tr>
          ) : (
            tableData.map((e, i) => {
              return (
                <tr
                  key={e[`${path}_id`]||i}
                  onClick={checkedHandler}
                  name={e[`${path}_id`]}
                  // id={e?.isChecked || false}
                  // {...(e?.isChecked !== undefined && { id: e?.isChecked })}
                  data-checked={e?.isChecked || false}
                  className={`border ${
                    e.isChecked ? "bg-[#D7C9FF]" : "bg-white"
                  } relative z-10 hover:bg-[#D7C9FF] border-[#381E50]`}
                >
                  {maxTableHeaders.map((header) => {
                    return (
                      <td
                        className="border border-[#381E50]"
                        key={`${i}-${header}`}
                      >
                        {e[header]??"null"}
                      </td>
                    );
                  })}
                  <td key={`${i}-checkbox`} className="pt-[4px]">
                    <input
                      type="checkbox"
                      name={e[`${path}_id`]}
                      value={e[`${path}_id`]}
                      // checked={check.includes(e[`${path}_id`])}
                      checked={e?.isChecked || false}
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
