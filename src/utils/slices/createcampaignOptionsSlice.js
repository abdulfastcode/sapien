import { createSlice } from "@reduxjs/toolkit";

//   "body": {
//     "conversions_list": [
//         {
//             "conversion_id": "1",
//             "operator": "AND"
//         },
//         {
//             "conversion_id": "2",
//             "operator": "OR"
//         }
//     ],
//     "name": "dummy_name",
//     "phone_id": "2",
//     "script": "You are an AI sales agent",
//     "voice_id": "1"
// },

let createCampaignOptionsSlice = createSlice({
    name: 'createCampaignOptions',
    initialState: {
        options: null
    },
    reducers: {
        setCampaignOptions: (state, action) => {
            state.options = action.payload;
        }
    }
})

export const { setCampaignOptions } = createCampaignOptionsSlice.actions;
export default createCampaignOptionsSlice.reducer