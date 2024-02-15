import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  uploadCsvFile,
  uploadJsonFile,
  uploadXlsxFile,
} from "../../../../utils/slices/fileSlice";
import useFileDataExtractor from "../../../../utils/cus-hooks/useFileDataExtractor";
import { useNavigate } from "react-router-dom";

const UploadFile = () => {
  const [jsonData, setJsonData] = useState(null);
  const [csvData, setCsvData] = useState(null);
  const [xlsxData, setXlsxData] = useState(null);
  let dispatch = useDispatch();
  let jsonFileData = useSelector((state) => state.fileLoader.json);
  console.log(jsonFileData);
  const navigate = useNavigate();

  async function handleFileChange(e) {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const fileName = selectedFile.name;
      const fileExtension = fileName.split(".").pop().toLowerCase();

      let res = await useFileDataExtractor(fileExtension, selectedFile);
      console.log(res);
      if (res.json) {
        console.log(res.json);
        // setJsonData(res.json);
        dispatch(uploadJsonFile(res.json));
        navigate("/dashboard/audience/create/create=json");
      }
      if (res.csv) {
        console.log("object", res.csv);
        dispatch(uploadCsvFile(res.csv.data));
        navigate("/dashboard/audience/create/create=json");
        // setCsvData(res.csv);
      }
      // if (res.xlsx) setXlsxData([res.xlsx]);
    }
  }
  useEffect(() => {
    dispatch(uploadJsonFile(null));
    dispatch(uploadCsvFile(null));

    // console.log(jsonData);
    // console.log(csvData);
    // dispatch(uploadCsvFile(csvData));
    // dispatch(uploadXlsxFile(xlsxData));
  }, [jsonData, csvData, xlsxData]);

  return (
    <div className="px-[24px] py-[29px] ">
      <div className="flex gap-[40px] sm:gap-[50px] pb-[30px]">
        <div>Name</div>
        <div className="border border-black px-2">Real-Estate-NYC-HNIs</div>
      </div>
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
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">CSV,JSON</p>
            <ul className="text-sm text-gray-500 dark:text-gray-400 mt-2 ">
              Your csv should have two mandatory columns: 
              <li className="text-center before:content-['•'] text">phone  10 digit</li>
              <li className="text-center before:content-['•'] text">phone countrycode - eg. +01</li>
              
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
    </div>
  );
};

export default UploadFile;
