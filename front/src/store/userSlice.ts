import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface UserState{
    email: string,
    password: string,
    isLogin: boolean,
    userInfo: any,
}

const initialState: UserState = {
    email: "",
    password: "",
    isLogin: false,
    userInfo: null,
}

export const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {   // vuex action
        changeIsLogin: (state, action: PayloadAction<boolean>) => {
            state.isLogin = action.payload;
        }
    }
})

export const { changeIsLogin } = UserSlice.actions;

export const selectCount = (state: RootState) => state.user

export default UserSlice.reducer
