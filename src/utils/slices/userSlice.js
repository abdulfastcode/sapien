import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user_info',
  initialState: {
    country_code: '',
    current_usage: [],
    designation: '',
    have_dev_team: false,
    phone: '',
  },
  reducers: {
    updateUserInfo(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { updateUserInfo } = userSlice.actions;

export default userSlice.reducer;
