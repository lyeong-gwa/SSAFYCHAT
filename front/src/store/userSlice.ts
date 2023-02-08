import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { login } from "../api/user";

interface UserState{
    userId: string,
    userPwd: string,
    isLogin: boolean,
    userInfo: any,
}

const initialState: UserState = {
    userId: "",
    userPwd: "",
    isLogin: false,
    userInfo: null,
}

export const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {   // vuex action
        abc: (state, action: PayloadAction<boolean>) => {
            state.isLogin = action.payload;
        },
        signIn: (state, action: PayloadAction<{}>) => {
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
                    }
                },
                (error: any) => {
                    console.log(error);
                }
            )
            state.isLogin = true;
            console.log(state.isLogin);
        }
    }
})

export const { signIn } = UserSlice.actions;

export const selectCount = (state: RootState) => state.counter.value

export default UserSlice.reducer
