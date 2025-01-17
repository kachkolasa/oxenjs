import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SidenavState {
    isWidgetsModalOpen: boolean;
}

const initialState: SidenavState = {
    isWidgetsModalOpen: false,
};

const sidenavSlice = createSlice({
    name: "sidenav",
    initialState,
    reducers: {
        toggleWidgetsModal(state) {
            state.isWidgetsModalOpen = !state.isWidgetsModalOpen;
        },
        closeWidgetsModal(state) {
            state.isWidgetsModalOpen = false;
        }
    },
});

export const sidenavActions = sidenavSlice.actions;
export default sidenavSlice.reducer;
