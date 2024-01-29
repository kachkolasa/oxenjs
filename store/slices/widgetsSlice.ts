import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WidgetsState {
    
}

const initialState: WidgetsState = {
    
};

const WidgetsSlice = createSlice({
    name: "widgets",
    initialState,
    reducers: {
        
    },
});

export const widgetsActions = WidgetsSlice.actions;
export default WidgetsSlice.reducer;
