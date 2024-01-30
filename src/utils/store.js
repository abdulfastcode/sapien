import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import dashboardSlice from "./dashboardSlice";

const store = configureStore({
    reducer: {
        user: userSlice,
        dashboard: dashboardSlice
    }
})

export default store