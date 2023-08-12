import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../slices/userSlice";
import apiSlice from "../slices/apiSlice";



const store = configureStore({
    reducer: {
        user: userSlice,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    devTools: true,
    middleware:getDefaultMiddleware=>getDefaultMiddleware().concat(apiSlice.middleware)
})

export default store