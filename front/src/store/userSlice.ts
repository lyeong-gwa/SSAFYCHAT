import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface UserInfo{
    belong: string,
    social: string,
    studentNumber: string,
    job: string,
    totalScore: number,
}

interface UserState{
    email: string,
    name: string,
    userId: string,
    role: string,
    isLogin: boolean,
    banner: string,
    userInfo: UserInfo,
}

const initialState: UserState = {
    email: "",
    name: "",
    userId: "",
    role: "",
    isLogin: false,
    banner: "",
    userInfo: {
        belong: "",
        social: "",
        studentNumber: "",
        job: "",
        totalScore: 0,
    },
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
        },
        changeBanner: (state, action: PayloadAction<string>) => {
            state.banner = action.payload;
        },
        appendUserInfo: (state, action: PayloadAction<UserInfo>) => {
            state.userInfo = action.payload;
        },
    }
})

export const { changeIsLogin, appendEmail, appendName, appendUserId, appendRole, changeBanner, appendUserInfo } = UserSlice.actions;

export const selectCount = (state: RootState) => state.user

export default UserSlice.reducer
