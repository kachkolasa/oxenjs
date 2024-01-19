import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PageBuilderSlice {
    activeSection: string|null;
}

const initialState: PageBuilderSlice = {
    activeSection: '',
};

const pagebuilderSlice = createSlice({
    name: "pagebuilder",
    initialState,
    reducers: {
        activeSection(state, action){
            state.activeSection = action.payload;
        }
    },
});

export const pagebuilderActions = pagebuilderSlice.actions;
export default pagebuilderSlice.reducer;
