import { createSlice } from "@reduxjs/toolkit";

const fileSlice = createSlice({
    name: 'fileLoader',
    initialState : {
        json:null,
        csv:null,
        xlsx:null
    },
    reducers:{
        uploadJsonFile : (state,action)=>{
            state.json = action.payload
        },
        uploadCsvFile : (state,action)=>{
            state.csv = action.payload
        },
        uploadXlsxFile : (state,action)=>{
            state.json = action.payload
        }
    }
})

export const  {uploadJsonFile,uploadCsvFile,uploadXlsxFile} = fileSlice.actions
export default fileSlice.reducer