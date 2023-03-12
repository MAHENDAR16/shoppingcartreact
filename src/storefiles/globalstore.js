import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authenticated.js';
import billSlice from './billamount.js';
import cartSlice from './cartItems.js';
const store = configureStore({
    reducer : {auth:authSlice.reducer, bill : billSlice.reducer, cartItem : cartSlice.reducer},
    }
)

export default store;