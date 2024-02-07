import react, { useEffect, useState } from "react"

// export const useAudienceData = () => {
//     const [audienceData, setAudienceData] = useState([])
//     useEffect(() => {
//         const headers = {
//             Authorization:
//                 "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYWJkdWwifQ.QRyeI86pVtG8vJuQCWM-l0mAbC6IAUrp8ppcD7gzHBc",
//         };
//         fetch("http://3.6.158.162:5000/get_api_signature?api_name=get_audience_list", {
//             headers,
//         })
//             .then((response) => response.json())
//             .then((data) => setAudienceData(data.response));
//     }, [])
//     return audienceData
// }

export const audienceData = [

    {
        id: '1',
        name: 'Real-Estate-NYC-HNIs',
        'date time': '12.03.2023 12:23:32',
        recipients: '800'
    },

    {
        id: '2',
        name: 'Real-Estate-NYC-HNIs',
        'date time': '12.03.2023 12:23:32',
        recipients: '800'
    },
]