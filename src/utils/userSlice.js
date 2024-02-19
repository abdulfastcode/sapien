import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    // initialState: {
    //      userDetails: [
    //         // { email: "abcjsx" }
    //     ]
    // },
    initialState: null,
    // initialState: {email:"zaw@gmail.com"},
    reducers: {
        addUserEmail: (state, action) => {
            return action.payload
        },
        removeUser: (state, action) => {
            return null
        }
    }
})

export const { addUserEmail, removeUser } = userSlice.actions;
export default userSlice.reducer;