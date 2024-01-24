import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PageBuilderSlice {
    activeSection: string|null;
    activeColumn: string|null;
    activeWidget: string|null;
    contextMenuTarget: string|null;
}

const initialState: PageBuilderSlice = {
    activeSection: '',
    activeColumn: '',
    contextMenuTarget: '',
    activeWidget: '',
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
        activeWidget(state, action){
            state.activeWidget = action.payload;
        },
        contextMenuTarget(state, action){
            state.contextMenuTarget = action.payload;
        },
    },
});

export const pagebuilderActions = pagebuilderSlice.actions;
export default pagebuilderSlice.reducer;
