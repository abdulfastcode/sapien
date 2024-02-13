import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import dashboardSlice from "./slices/dashboardSlice";
import fileSlice from "./slices/fileSlice";
import createAgentOptionsSlice from "./slices/createAgentOptionsSlice";

const store = configureStore({
    reducer: {
        user: userSlice,
        dashboard: dashboardSlice,
        fileLoader: fileSlice,
        createAgentOptions: createAgentOptionsSlice
    }
})

export default store