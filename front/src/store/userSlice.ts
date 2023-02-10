import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface UserInfo{
    belong: string,
    social: string,
    studentNumber: string,
    job: string,
    totalScore: number,
}

interface No{
    '01': string,
    '02': string,
    '03': string,
    '04': string,
    '05': string,
    '06': string,
    '07': string,
    '08': string,
    '09': string,
    '10': string,
}

interface UserState{
    email: string,
    name: string,
    userId: string,
    role: string,
    isLogin: boolean,
    banner: string,
    no: No,
    userInfo: UserInfo,
}

const initialState: UserState = {
    email: "",
    name: "",
    userId: "",
    role: "",
    isLogin: false,
    banner: "",
    no: {
        '01': '1기 입니다.',
        '02': '2기 입니다.',
        '03': '3기 입니다.',
        '04': '4기 입니다.',
        '05': '5기로 극복',
        '06': '열정 핫식스',
        '07': '럭키세븐',
        '08': '7전8기',
        '09': "9뤠이트",
        '10': "10기 입니다.",
    },
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
