import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WidgetsState {
    currentlyDragging: string;
}

const initialState: WidgetsState = {
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
