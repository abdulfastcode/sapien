import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'createAgent',

    // initialState: { name: null },
    reducers: {
        addUserDetails: (state, action) => {
            return action.payload
        },
        removeUser: (state, action) => {
            return null
        }
    }
})

export const { addUserDetails, removeUser } = userSlice.actions;
export default userSlice.reducer;