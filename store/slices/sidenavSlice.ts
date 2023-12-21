import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
    isWidgetsModalOpen: boolean;
}

const initialState: ModalState = {
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
