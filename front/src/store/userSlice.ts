import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { login, logout } from "../api/user";

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
        signIn: (state, action: PayloadAction<UserState>) => {
            let tmp: boolean = false;
            login(
                action.payload,
                (data: any) => {
                    if(data.status === 200){
                        const accessToken = data.data["accessToken"];
                        const refreshToken = data.data["refreshToken"];
                        sessionStorage.setItem("access-token", accessToken);
                        sessionStorage.setItem("refresh-token", refreshToken);
                        console.log("123");
                        tmp = true;
                    }
                },
                (error: any) => {
                    console.log(error);
                }
            )
            if(tmp){
                state = action.payload;
                tmp = false;
                console.log(state.isLogin);
            }
        },
        signOut: (state, action: PayloadAction<UserState>) => {
            let tmp: boolean = false;
            logout(
                action.payload,
                (data: any) => {
                    if(data.status === 200){
                        console.log(sessionStorage.getItem('access-token'));
                        sessionStorage.removeItem('access-token');
                        sessionStorage.removeItem('refresh-token');
                        tmp = true;
                    }
                },
                (error: any) => {
                    console.log(error);
                }
            )
            if(tmp){
                state = action.payload;
                tmp = false;
                console.log(state.isLogin);
            }
        }
    }
})

export const { signIn, signOut } = UserSlice.actions;

export const selectCount = (state: RootState) => state.user

export default UserSlice.reducer
