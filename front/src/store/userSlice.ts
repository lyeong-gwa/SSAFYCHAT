import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface UserState{
    email: string,
    name: string,
    userId: string,
    role: string,
    isLogin: boolean,
    userInfo: any,
}

const initialState: UserState = {
    email: "",
    name: "",
    userId: "",
    role: "",
    isLogin: false,
    userInfo: null,
}

export const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {   // vuex action
        changeIsLogin: (state, action: PayloadAction<boolean>) => {
            state.isLogin = action.payload;
        },
        appendEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
        appendName: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
        },
        appendUserId: (state, action: PayloadAction<string>) => {
            state.userId = action.payload;
        },
        appendRole: (state, action: PayloadAction<string>) => {
            state.role = action.payload;
        }
    }
})

export const { changeIsLogin, appendEmail, appendName, appendUserId, appendRole } = UserSlice.actions;

export const selectCount = (state: RootState) => state.user

export default UserSlice.reducer
