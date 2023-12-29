import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './Cart'

export const store = configureStore({
    reducer:{
        cart:cartReducer,
    }
})

