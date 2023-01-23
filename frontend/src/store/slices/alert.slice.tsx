import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface AuthState {
    type: string,
    message: string,
}

const initAuthState: AuthState = {
    type: "",
    message: "",
}

export const alertSlice = createSlice({
    name: 'alert',
    initialState: initAuthState,
    reducers: {
        SET_TYPE: (state: AuthState, action: PayloadAction<string>) => {
            state.type = action.payload
        },
        SET_MESSAGE: (state: AuthState, action: PayloadAction<string>) => {
            state.message = action.payload;
        },
    },
})

export const { SET_TYPE, SET_MESSAGE } = alertSlice.actions;