import {createSlice} from '@reduxjs/toolkit';
const authSlice = createSlice({
    name : "auth",
    initialState : {isLogin:false, username : ''},
    reducers : {
        login(state, action){
            state.isLogin = true;
            state.username = action.payload;
        },
        logout(state)
        {
            state.isLogin = false;
            state.username = "";
        }

    }
})

export const authActions = authSlice.actions;
export default authSlice;