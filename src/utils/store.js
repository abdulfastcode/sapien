import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import dashboardSlice from "./slices/dashboardSlice";
import fileSlice from "./slices/fileSlice";
import createAgentOptionsSlice from "./slices/createAgentOptionsSlice";
import createcampaignOptionsSlice from "./slices/createcampaignOptionsSlice";

const store = configureStore({
    reducer: {
        user: userSlice,
        dashboard: dashboardSlice,
        fileLoader: fileSlice,
        createAgentOptions: createAgentOptionsSlice,
        createCampaignOptions: createcampaignOptionsSlice
    }
})

export default store