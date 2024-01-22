import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PageBuilderSlice {
    activeSection: string|null;
    activeColumn: string|null;
}

const initialState: PageBuilderSlice = {
    activeSection: '',
    activeColumn: '',
};

const pagebuilderSlice = createSlice({
    name: "pagebuilder",
    initialState,
    reducers: {
        activeSection(state, action){
            state.activeSection = action.payload;
        },
        activeColumn(state, action){
            state.activeColumn = action.payload;
        },
    },
});

export const pagebuilderActions = pagebuilderSlice.actions;
export default pagebuilderSlice.reducer;
