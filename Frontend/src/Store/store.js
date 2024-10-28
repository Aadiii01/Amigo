import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import userProfileReducer from "./userProfile";
import connectionReducer from "./connectionSlice";
import requestReducer from "./requestSlice";

const store = configureStore({
  reducer: {
    userData: userReducer,
    feedData: feedReducer,
    userProfileData: userProfileReducer,
    connectionData: connectionReducer,
    requestData: requestReducer,
  },
});

export default store;
