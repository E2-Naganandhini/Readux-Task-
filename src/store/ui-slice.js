import { createSlice } from "@reduxjs/toolkit";
const uiSlice = createSlice({
    name: "ui",
    initialState: {
        addModalIsVisible: false,
        viewProductIsVisible: false,
        editOptionIsTrue: false,
    },
    reducers: {
        toggleAddModal(state) {
            state.addModalIsVisible = !state.addModalIsVisible;
        },
        toggleViewProductModal(state) {
            state.viewProductIsVisible = !state.viewProductIsVisible;
        },
        toggleEditOption(state) {
            state.editOptionIsTrue = !state.editOptionIsTrue;
        },
    },
});

export const uiActions = uiSlice.actions;
export default uiSlice;
