import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
    currentlyDragging: string;
}

const initialState: ModalState = {
    currentlyDragging: '',
};

const WidgetsSlice = createSlice({
    name: "widgets",
    initialState,
    reducers: {
        changeDraggingWidget(state, action){
            state.currentlyDragging = action.payload;
        }
    },
});

export const widgetsActions = WidgetsSlice.actions;
export default WidgetsSlice.reducer;
