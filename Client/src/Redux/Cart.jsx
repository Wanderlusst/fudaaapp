// provider 
// store
// reducer
// actions

import {createSlice} from "@reduxjs/toolkit"

const INITIAL_STATE = {
    cartList:[],
    cartCount:{},
    isLogin:false
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: INITIAL_STATE,
    reducers: {
      increment: (state, action) => {
        const itemId = action.payload;
        state.cartCount[itemId] = (state.cartCount[itemId] || 0) + 1;
      },
      decrement: (state, action) => {
        const itemId = action.payload;
        if (state.cartCount[itemId] && state.cartCount[itemId] > 0) {
          state.cartCount[itemId] -= 1;
        }
      },
      addTocart: () => {},
      loginSwitch: (state, action) => {
        state.isLogin = action.payload;
      }         
    },
  });
  
  
  

export const {increment,decrement,addTocart,loginSwitch} = cartSlice.actions

export default cartSlice.reducer