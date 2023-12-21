import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
    isWidgetsModalOpen: boolean;
}

const initialState: ModalState = {
    isWidgetsModalOpen: false,
};

const sidenavSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        toggleWidgetsModal(state) {
            state.isWidgetsModalOpen = !state.isWidgetsModalOpen;
        }
    },
});

export const sidenavActions = sidenavSlice.actions;
export default sidenavSlice.reducer;
