import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import dashboardSlice from "./slices/dashboardSlice";
import fileSlice from "./slices/fileSlice";

const store = configureStore({
    reducer: {
        user: userSlice,
        dashboard: dashboardSlice,
        fileLoader: fileSlice
    }
})

export default store