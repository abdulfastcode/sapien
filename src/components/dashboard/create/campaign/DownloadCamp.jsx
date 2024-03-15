import React, { useEffect, useState } from "react";
import downloadIcon from "../../../../assets/icons/Download.svg";
import { baseUrl } from "../../../../utils/baseUrl";
import { CSVLink } from "react-csv";
const DownloadCamp = ({tableData}) => {
  const [downloadItems, setDownloadItems] = useState([]);

    console.log("tableData",tableData)

    let idsSelectedData = tableData
    .map((obj) => {
      for (const key of Object.keys(obj)) {
        if (key.includes("id") && obj.isChecked === true) {
          return obj[key];
        }
      }
    })
    .filter(Boolean);
    console.log("idsSelectedData",idsSelectedData)
    const checkIdsWithParams = idsSelectedData?.join(`&campaign_id=`);

    useEffect(()=>{
        let token = localStorage.getItem("auth_token");

    if (idsSelectedData?.length >= 1) {
      console.log(
        "idsSelectedData",
        `${baseUrl}/calls/get_call_by_campaign?campaign_id=${checkIdsWithParams}`
      );
      
        fetch(
        //   `${baseUrl}/calls/get_call_by_campaign?campaign_id=${checkIdsWithParams}`,
       "https://api.smallest.ai/calls/get_call_by_id?call_id=1",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
          .then((response) => response.json())
          .then((data) => {
           
           
              console.log("downloadItems", data);
              setDownloadItems(data);
            
          
           
          });
        }else {
            setDownloadItems([]); // Reset download items if checkbox is empty
            
          }
    },[checkIdsWithParams])
    console.log("downloadItems->", downloadItems);

  return (
    <div>
      {/* <button>
        <img src={downloadIcon} alt="downloadIcon" />
      </button> */}
      
       <CSVLink
            data={downloadItems}
            filename={`campaign_call_id:${idsSelectedData}_${new Date().toString()}.csv`}
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
    </div>
  );
};

export default DownloadCamp;
