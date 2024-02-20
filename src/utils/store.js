import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import dashboardSlice from "./slices/dashboardSlice";
import fileSlice from "./slices/fileSlice";
import createAgentOptionsSlice from "./slices/createAgentOptionsSlice";
import createcampaignOptionsSlice from "./slices/createcampaignOptionsSlice";
import responseReducer from "./slices/responseSlice";
import userReducer from './userSlice';

const store = configureStore({
    reducer: {
        user: userSlice,
        dashboard: dashboardSlice, 
        fileLoader: fileSlice,
        createAgentOptions: createAgentOptionsSlice,
        createCampaignOptions: createcampaignOptionsSlice,
        user_info: userReducer,
        response: responseReducer,
    }
})

export default store