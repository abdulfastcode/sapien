import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: null,
};

const responseSlice = createSlice({
  name: "responseMessage",
  initialState,
  reducers: {
    setResponseMessage(state, action) {
      state.message = action.payload;
    },
  },
});

export const { setResponseMessage } = responseSlice.actions;
export default responseSlice.reducer;