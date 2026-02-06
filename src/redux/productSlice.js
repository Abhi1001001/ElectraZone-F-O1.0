import { createSlice }  from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: "Product",
    initialState: {
        products: [],
        cart: [],
    },
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload;
        },
        setCart: (state, action) => {
            state.cart = action.payload;
        },
        setCollection: (state, action) => {
            state.collection = action.payload;
        },
    },
})

export const { setProducts, setCart, setCollection } = productSlice.actions
export default productSlice.reducer