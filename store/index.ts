import { configureStore } from "@reduxjs/toolkit";
import sidenavSlice from "./slices/sidenavSlice";
import widgetsSlice from "./slices/widgetsSlice";

const store = configureStore({
    reducer: {
        sidenav: sidenavSlice,
        widgets: widgetsSlice,
    },
});

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch