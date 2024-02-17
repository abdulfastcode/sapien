import React from "react";
import { useSelector } from "react-redux";

const TableUploadedData = () => {
  //   console.log("csvData", csvData);
  const jsonData = useSelector((state) => state.fileLoader.json);
    console.log("jsonData", jsonData);
  const csvData = useSelector((state) => state.fileLoader.csv);
  if (jsonData) {
    const renderContacts = (contacts) => {
      console.log("renderCont", contacts);
      return (
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
                  <td className="border border-[#381E50] ">{contact?.name}</td>
                  <td className="border border-[#381E50] ">{contact?.phone}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    };

    return (
      <div className="overflow-auto">
        <table className="w-full table-auto ">
          <thead className="items-center border border-[#381E50]">
            <tr>
              <th className="text-base border border-[#381E50] font-bold  text-[#381E50]">
                contacts
              </th>
              <th className="text-base border border-[#381E50] font-bold  text-[#381E50]">
                name
              </th>
            </tr>
          </thead>
          <tbody className="text-center border border-[#381E50]">
            <tr>
              <td className="p-0">{renderContacts(jsonData[0]?.contacts)}</td>
              <td>{jsonData[0]?.name}</td>
            </tr>
          </tbody>
        </table>
      </div>
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
    console.log(headerValues);
    const renderData = () => {
      return (
        <>
          <div>
            {/* <div>Name</div> */}
            {/* {csvData.map((item, index) => (
              <div key={index} className="border border-[#381E50] p-2">{item.name}</div>
            ))} */}
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
                    <tr
                      key={ i}
                     
                      
                    >
                      {headerValues.map((header) => {
                        return (
                          <td
                            className="border border-[#381E50]"
                            key={`${i}-${header}`}
                          >
                            {e[header]||"null"}
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
