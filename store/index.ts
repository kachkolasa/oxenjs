import { configureStore } from "@reduxjs/toolkit";
import sidenavSlice from "./slices/sidenavSlice";

const store = configureStore({
    reducer: {
        sidenav: sidenavSlice,
    },
});

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch