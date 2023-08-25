import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./features/auth/authSlice";
import { productSlice } from "./features/product/productSlice";
import {cartSlice} from "./features/cart/cartSlice";
import { orderSlice } from "./features/orders/orderSlice";
export const store = configureStore({
    reducer:{
        auth : authSlice.reducer,
        product : productSlice.reducer,
        cart : cartSlice.reducer,
        order: orderSlice.reducer
    }
})