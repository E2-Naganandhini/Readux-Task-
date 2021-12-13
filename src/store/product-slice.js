import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: "product",
    initialState: {
        productDetails: [],
    },
    reducers: {
        setProductDetails(state, action) {
            return { ...state, productDetails: action.payload };
        },
    },
});

export const productAction = productSlice.actions;
export default productSlice;
