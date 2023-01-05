import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface LoginState {
    authOk: boolean,
    accessToken: string | null,
}

const initLoginState: LoginState = {
    authOk: false,
    accessToken: null,
}

const tokenSlice = createSlice({
    name: 'token',
    initialState: initLoginState,
    reducers: {
        SET_TOKEN: (state: LoginState, action: PayloadAction<string>) => {
            state.authOk = true;
            state.accessToken = action.payload;
        },
        DELETE_TOKEN: (state) => {
            state.authOk = false;
            state.accessToken = null;
        },
    }
})

export const { SET_TOKEN, DELETE_TOKEN } = tokenSlice.actions;

export default tokenSlice.reducer;