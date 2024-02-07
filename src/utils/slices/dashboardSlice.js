import { createSlice } from "@reduxjs/toolkit";

let dashboardSlice = createSlice({
    name: 'dashboardTable',
    initialState: {
        table: null,
        checkBox: null
    },
    reducers: {
        addDataTable: (state, action) => {
            state.table = action.payload
        },
        addCheckboxState: (state, action) => {
            state.checkBox = action.payload
        },
        removeData: (state, action) => {
            let newTable = state.table.filter((e) => !action.payload.includes(e.id));
            state.table = newTable
            // console.log("action.payload", action.payload)
            // console.log(state.checkBox)
            // return state.table.filter(e => e.id !== '1')


        }
    }
})

export const { addDataTable, removeData, addCheckboxState } = dashboardSlice.actions;
export default dashboardSlice.reducer