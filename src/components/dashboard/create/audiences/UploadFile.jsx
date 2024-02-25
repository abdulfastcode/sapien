import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  uploadCsvFile,
  uploadJsonFile,
  uploadAudienceName,
} from "../../../../utils/slices/fileSlice";
import useFileDataExtractor from "../../../../utils/cus-hooks/useFileDataExtractor";
import { useLocation, useNavigate } from "react-router-dom";
import DashboardTable from "../../table/DashboardTable";
import { useMaxHeaderValues } from "../../../../utils/cus-hooks/useMaxHeaderValues";

const UploadFile = () => {
  // const [jsonData, setJsonData] = useState(null);
  // const [csvData, setCsvData] = useState(null);
  // const [xlsxData, setXlsxData] = useState(null);
  let csvFileData = useSelector((state) => state.fileLoader.csv);
  let { search } = useLocation();
  let querySearch = search?.split("?");
  let indvQuery = querySearch[1];
  let audienceIdfromQuery = indvQuery?.split("=").pop();
  console.log("audienceIdfromQuery", audienceIdfromQuery);
  console.log("indvQuery", indvQuery);

  const downlaodedData = useSelector((state) => state.downloadData.downloads);
  let dispatch = useDispatch();
  let jsonFileData = useSelector((state) => state.fileLoader.json);
  const navigate = useNavigate();
  let [audienceName, setAudienceName] = useState("");
  console.log(jsonFileData);

  async function handleFileChange(e) {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const fileName = selectedFile.name;
      const fileExtension = fileName.split(".").pop().toLowerCase();

      let res = await useFileDataExtractor(fileExtension, selectedFile);
      console.log(res);
      if (res.json) {
        console.log(res.json);
        dispatch(uploadAudienceName(audienceName));
        dispatch(uploadJsonFile([{ ...res.json[0], name: audienceName }]));
        // dispatch(uploadJsonFile(res.json));
        if (audienceIdfromQuery) {
          navigate(`/dashboard/audience/create/create/json?${indvQuery}`);
        } else {
          navigate(`/dashboard/audience/create/create/json`);
        }
      }
      if (res.csv) {
        console.log("object", res.csv);

        dispatch(uploadAudienceName(audienceName));
        dispatch(uploadCsvFile(res.csv.data));
        if (audienceIdfromQuery) {
          navigate(`/dashboard/audience/create/create/csv?${indvQuery}`);
        } else {
          navigate("/dashboard/audience/create/create/csv");
        }
        // setCsvData(res.csv);
      }
      // if (res.xlsx) setXlsxData([res.xlsx]);
    }
  }
  useEffect(() => {
    dispatch(uploadJsonFile(null));
    dispatch(uploadCsvFile(null));
    console.log("call useEff@@@@@@@@@@@@@@@");

    // console.log(jsonData);
    // console.log(csvData);
    // dispatch(uploadCsvFile(csvData));
    // dispatch(uploadXlsxFile(xlsxData));
  }, [audienceName]);
  console.log("audienceName", audienceName);
  console.log("downlaodedData", downlaodedData);
  let tableData;
  if (downlaodedData) {
    console.log("downlaodedData", "namesss");
    console.log("downlaodedData", downlaodedData);

    tableData = downlaodedData[0]?.contacts;
    dispatch(uploadAudienceName(audienceName));
    dispatch(uploadCsvFile(tableData));
    console.log("downlaodedData", downlaodedData);
    console.log("csvData", csvFileData);
  }
  let maxTableHeaders = useMaxHeaderValues(tableData);
  maxTableHeaders?.sort();

  return (
    <div className="px-[24px] py-[29px] ">
      <div className="flex items-center flex-wrap gap-[20px] justify-between pb-[30px]">
        <div className="flex items-center  gap-[40px]  sm:gap-[50px] ">
          <div>Name</div>
          <input
            value={audienceName}
            onChange={(e) => setAudienceName(e.target.value)}
            type="text"
            placeholder={
              audienceIdfromQuery ? downlaodedData[0]?.name : "ENTER NAME"
            }
            className="border border-[#381E50] py-[2px] px-2"
          ></input>
        </div>
        {audienceIdfromQuery && (
          <div>
         
            <div className="flex w-full  items-center justify-center bg-grey-lighter">
              <label className="w-[180px] flex items-center justify-center gap-[15px] px-1 py-2 bg-[#d7c9ff] text-blue rounded-sm text-[#381E50]   border border-blue cursor-pointer hover:bg-[#381E50] hover:text-white">
                <svg
                  className="w-7 h-7 "
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                </svg>
                <span className=" ">Upload a File</span>
                <input
                  type="file"
                  accept=".csv, .json, "
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>
           
          </div>
        )}
      </div>
      {audienceIdfromQuery ? (
        // EDIT
        // <div>EDIT</div>
        <DashboardTable
          tableData={tableData}
          maxTableHeaders={maxTableHeaders}
          showCheckBox="false"
        />
      ) : (
        // CREATE
        <div className="w-full h-[50vh] ">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                CSV,JSON
              </p>
              <ul className="text-sm text-gray-500 dark:text-gray-400 mt-2 ">
                Your csv should have two mandatory columns:
                <li className="text-center before:content-['•'] text">
                  phone 10 digit
                </li>
                <li className="text-center before:content-['•'] text">
                  phone countrycode - eg. +01
                </li>
              </ul>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              accept=".csv, .json, "
              onChange={handleFileChange}
            />
          </label>
        </div>
      )}
    </div>
  );
};

export default UploadFile;
