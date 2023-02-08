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
            login(
                action.payload,
                (data: any) => {
                    if(data.status === 200){
                        const accessToken = data.data["accessToken"];
                        const refreshToken = data.data["refreshToken"];
                        sessionStorage.setItem("access-token", accessToken);
                        sessionStorage.setItem("refresh-token", refreshToken);
                        console.log(accessToken)
                        console.log(refreshToken)
                        state = action.payload;
                        console.log(state.isLogin);
                    }
                },
                (error: any) => {
                    console.log(error);
                }
            )
        },
        signOut: (state, action: PayloadAction<UserState>) => {
            logout(
                action.payload,
                (data: any) => {
                    if(data.status === 200){
                        console.log(sessionStorage.getItem('access-token'));
                        sessionStorage.removeItem('access-token');
                        sessionStorage.removeItem('refresh-token');
                        state = action.payload;
                    }
                },
                (error: any) => {
                    console.log(error);
                }
            )
        }
    }
})

export const { signIn, signOut } = UserSlice.actions;

export const selectCount = (state: RootState) => state.user

export default UserSlice.reducer
