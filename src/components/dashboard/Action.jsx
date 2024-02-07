// import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import deleteIcon from "../../assets/icons/deleIcon.svg";
import downloadIcon from "../../assets/icons/Download.svg";
import { removeData } from "../../utils/slices/dashboardSlice";
import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";

const Action = () => {
  let checkbox = useSelector((state) => state.dashboard.checkBox);
  // const createcsvfilename = ()=> `data_${moment().format()}.csv`;
  const [downloadItems, setDownloadItems] = useState([]);

  console.log(checkbox);
  let dispatch = useDispatch();
  function deleteHandler() {
    dispatch(removeData(checkbox));
  }

  const checkIdsWithParams = checkbox?.join("&audience_id=");
  useEffect(() => {
    if (checkbox?.length >= 1) {
      const headers = {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYWJkdWwifQ.QRyeI86pVtG8vJuQCWM-l0mAbC6IAUrp8ppcD7gzHBc",
      };
      fetch(
        `http://3.6.158.162:5000/audiences/get_audience?audience_id=${checkIdsWithParams}`,
        {
          headers,
        }
      )
        .then((response) => response.json())
        .then((data) => setDownloadItems(data));
    }
  }, [checkbox]);
  console.log("downloadItems->", downloadItems);

  // let csvData = downloadItems?.contacts?.map((contact) => ({
  //   Phone: contact.phone,
  //   CountryCode: contact.countrycode,
  //   ContactID: contact.contact_id,
  // }));
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

        <CSVLink
          data={downloadItems}
          filename={`audience_data_${new Date().toString()}.csv`}
          className="cursor-pointer"
        >
          {checkbox?.length >= 1 && (
            <img
              // onClick={downloadCsv}
              src={downloadIcon}
              alt="downloadIcon"
            />
          )}
        </CSVLink>

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
