import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name:"cartitems",
    initialState : {totalCartItem : 0},
    reducers : {
        add(state){
            state.totalCartItem += 1;
        },
        subtract(state){
            state.totalCartItem -= 1;
        },
        makeZero(state){
            state.totalCartItem = 0;
        }
    }

})

export const cartItemActions = cartSlice.actions;
export default cartSlice;
