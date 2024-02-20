import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadAudienceName, uploadJsonFile } from "../../../../utils/slices/fileSlice";

const TableUploadedData = () => {
  //   console.log("csvData", csvData);

  const audienceNameRedux = useSelector((state) => state.fileLoader.audienceName);

  let dispatch = useDispatch()
  const jsonData = useSelector((state) => state.fileLoader.json);
  console.log("jsonData", jsonData);
  const csvData = useSelector((state) => state.fileLoader.csv);
  const audienceName = useSelector((state) => state.fileLoader.audienceName);
  console.log("audienceName", audienceName);
  let [audienceNameReset,setAudienceNameReset] = useState('')
console.log("audienceNameRedux",audienceNameRedux)

  if(audienceNameReset){
console.log("audienceNameRedux",audienceNameRedux)
    dispatch(uploadAudienceName(audienceNameReset))
  }
  // useEffect(() => {
  //   dispatch(uploadCsvFile({ ...jsonData, name: audienceName }));
  // }, []);
  if (jsonData) {
    const renderContacts = (contacts) => {
      console.log("renderCont", contacts);
      return (
        <>
          <table className="w-full table-auto ">
            <thead className="items-center border border-[#381E50]">
              <tr>
                <th className="text-base border border-[#381E50] font-bold  text-[#381E50]">
                  age
                </th>
                <th className="text-base border border-[#381E50] font-bold  text-[#381E50]">
                  countrycode
                </th>
                <th className="text-base border border-[#381E50] font-bold  text-[#381E50]">
                  name
                </th>
                <th className="text-base border border-[#381E50] font-bold  text-[#381E50]">
                  phone
                </th>
              </tr>
            </thead>
            <tbody className="text-center border border-[#381E50]">
              {contacts?.map((contact, index) => {
                console.log("contact", contact);
                return (
                  <tr key={index}>
                    <td className="border border-[#381E50] ">{contact?.age}</td>
                    <td className="border border-[#381E50] ">
                      {contact?.countrycode}
                    </td>
                    <td className="border border-[#381E50] ">
                      {contact?.name}
                    </td>
                    <td className="border border-[#381E50] ">
                      {contact?.phone}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      );
    };

    return (
      <>
        <div className="flex flex-wrap px-6 py-4 text-[#381E50] items-center gap-20">
          <div>Name</div>
          <div className="border text-[#381E50] border-[#381E50] p-1">
            {audienceName || "No Name"}
          </div>
        </div>
        <div className="overflow-auto">
          <table className="w-full table-auto ">
            {/* <thead className="items-center border border-[#381E50]">
              <tr> */}
                {/* <th className="text-base border border-[#381E50] font-bold  text-[#381E50]">
                  contacts
                </th> */}
                {/* <th className="text-base border border-[#381E50] font-bold  text-[#381E50]">
                  name
                </th> */}
              {/* </tr>
            </thead> */}
            <tbody className="text-center border border-[#381E50]">
              <tr>
                <td className="p-0">{renderContacts(jsonData[0]?.contacts)}</td>
                {/* <td>{jsonData[0]?.name}</td> */}
              </tr>
            </tbody>
          </table>
        </div>
      </>
    );
  }
  if (csvData) {
    console.log(csvData);
    let headerValues = csvData.reduce((acc, curr) => {
      Object.keys(curr).forEach((key) => {
        if (!acc.includes(key)) {
          acc.push(key);
        }
      });
      return acc;
    }, []);
    console.log(headerValues.length);
    const renderData = () => {
      return (
        <>
          <div>
            <div className="flex flex-wrap px-6 py-4 text-[#381E50] items-center gap-20">
              <div>Name</div>
              {/* <div className="border text-[#381E50] border-[#381E50] p-1">
                {audienceName || "No Name"}
              </div> */}
               <input
               placeholder={audienceName?audienceName:"No Name"}
          value={audienceNameReset}
          onChange={(e) => setAudienceNameReset((e.target.value))}
          type="text"
          className="border border-[#381E50] py-[2px] px-2"
        ></input>
            </div>
            <div className="text-[#381E50] flex flex-wrap px-6 pb-4 items-center gap-20">
              <div>Custom Fields</div>
              <div className="text-[#381E50] p-1">{headerValues.length}</div>
            </div>
          </div>
          <div className="overflow-auto">
            <table className="w-full table-auto ">
              <thead className="items-center border border-[#381E50]">
                <tr>
                  {headerValues.map((e, i) => {
                    return (
                      <th
                        className="text-base border border-[#381E50] font-bold  text-[#381E50]"
                        key={i}
                      >
                        {e.charAt(0).toUpperCase() + e.slice(1)}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody className="text-center border border-[#381E50]">
                {csvData.map((e, i) => {
                  return (
                    <tr key={i}>
                      {headerValues.map((header) => {
                        return (
                          <td
                            className="border border-[#381E50]"
                            key={`${i}-${header}`}
                          >
                            {e[header] || "null"}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      );
    };

    return <div>{renderData()}</div>;
  }
};

export default TableUploadedData;
