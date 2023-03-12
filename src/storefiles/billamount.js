import {createSlice} from '@reduxjs/toolkit';

const billSlice = createSlice({
    name:"cartBill",
    initialState : {billamount : 0},
    reducers : {
        add(state, action){
            state.billamount += action.payload;
        },
        minus(state, action){
            state.billamount -= action.payload;
        },
        makeZero(state){
            state.billamount = 0;
        }
    }
})

export const billActions = billSlice.actions;
export default billSlice;