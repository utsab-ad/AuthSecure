import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./adminSlice";
import clientReducer from "./clientSlice";

const store = configureStore({
  reducer: {
    admin: adminReducer,
    client: clientReducer,
  },
});

export default store;
