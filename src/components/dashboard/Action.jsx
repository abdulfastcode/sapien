// import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import deleteIcon from "../../assets/icons/deleIcon.svg";
import downloadIcon from "../../assets/icons/Download.svg";
import {
  addCheckboxState,
  removeData,
} from "../../utils/slices/dashboardSlice";
import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { baseUrl, headers } from "../../utils/baseUrl";
import { useLocation } from "react-router-dom";

const Action = ({ selectedData, renderParentComponent }) => {
  // console.log("comp mount from action");
  // console.log(selectedData);
  // function extractIds(arr) {
  //   const ids = [];
  //   arr.forEach((obj) => {
  //     Object.keys(obj).forEach((key) => {
  //       if (key.includes("id")) {
  //         ids.push(obj[key]);
  //       }
  //     });
  //   });
  //   return ids;
  // }
  let idsSelectedData = selectedData
    .map((obj) => {
      for (const key of Object.keys(obj)) {
        if (key.includes("id") && obj.isChecked === true) {
          return obj[key];
        }
      }
    })
    .filter(Boolean);
  // console.log("idsSelectedData", idsSelectedData);
  const { pathname } = useLocation();
  // let checkbox = useSelector((state) => state.dashboard.checkBox);
  const [downloadItems, setDownloadItems] = useState([]);
  // console.log("pathname", pathname.split("/").pop());
  const path = pathname.split("/").pop();
  console.log("path", path);
  const checkIdsWithParams = idsSelectedData?.join(`&${path}_id=`);
  // console.log(checkIdsWithParams);
  // let dispatch = useDispatch();
  function deleteHandler() {
    console.log(
      `${baseUrl}/${path}s/delete_${path}?${path}_id=${checkIdsWithParams}`
    );

    async function deleteUser() {
      console.log("dekete user");
      renderParentComponent(false);
      try {
        let token = localStorage.getItem("auth_token");
        let post = await fetch(
          `${baseUrl}/${path}s/delete_${path}?${path}_id=${checkIdsWithParams}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            // query: JSON.stringify({ conversion_id: [id] }),
          }
        );
        console.log("post", post);
        let res = await post.json();

        renderParentComponent(true);
        console.log("res-", res);
      } catch (e) {
        console.error(e);
      }
    }
    deleteUser();
  }

  useEffect(() => {
    let token = localStorage.getItem("auth_token");

    if (idsSelectedData?.length >= 1) {
      console.log(
        `${baseUrl}/${path}s/get_${path}?${path}_id=${checkIdsWithParams}`
      );
      fetch(
        `${baseUrl}/${path}s/get_${path}?${path}_id=${checkIdsWithParams}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => setDownloadItems(data));
    } else {
      setDownloadItems([]); // Reset download items if checkbox is empty
    }
    return () => {
      // console.log("comp unmount from action");
    };
  }, [path, checkIdsWithParams]);
  // console.log("downloadItems->", downloadItems);
  // console.log(downloadItems);

  return (
    <div className="w-full flex px-[24px] py-[20px] h-[20px] items-center justify-between ]">
      <div>Action</div>
      <div className=" flex gap-4">
        {/* <img
              className={`${
                checkbox?.length >= 1 ? "cursor-pointer" : "cursor-not-allowed"
              }`}
              onClick={downloadCsv}
              src={downloadIcon}
              alt="downloadIcon"
            /> */}
        {path === "agent" ? (
          ""
        ) : (
          <CSVLink
            data={downloadItems}
            filename={`${path}_data_${new Date().toString()}.csv`}
            className="cursor-pointer"
          >
            {idsSelectedData?.length >= 1 && (
              <img
                // onClick={downloadCsv}
                src={downloadIcon}
                alt="downloadIcon"
              />
            )}
          </CSVLink>
        )}

        <img
          className="cursor-pointer"
          onClick={deleteHandler}
          src={deleteIcon}
          alt="deleteIcon"
        />
      </div>
    </div>
  );
};

export default Action;
