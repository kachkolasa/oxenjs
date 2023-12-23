import { configureStore } from "@reduxjs/toolkit";
import sidenavSlice from "./slices/sidenavSlice";
import widgetsSlice from "./slices/widgetsSlice";
import pageBuilderSlice from "./slices/pageBuilderSlice";

const store = configureStore({
    reducer: {
        sidenav: sidenavSlice,
        widgets: widgetsSlice,
        pagebuilder: pageBuilderSlice,
    },
});

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch