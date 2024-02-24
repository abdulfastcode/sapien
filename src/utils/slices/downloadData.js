import { createSlice } from "@reduxjs/toolkit";

let downloadDataSlice = createSlice({
    name: 'downloadData',
    initialState: {
        downloads: null
    },
    reducers: {
        audienceDownloadedData: (state, action) => {
            state.downloads = action.payload
        }
    }
})

export const { audienceDownloadedData } = downloadDataSlice.actions
export default downloadDataSlice.reducer