import {configureStore} from '@reduxjs/toolkit';
import authReducer from "./slices/auth.slice";
import userReducer from "./slices/user.slice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
    },
});

const state = store.getState()

export const getState = () => {
    return state
}

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
//export const subscribe = store.subscribe(state.auth.isLoggedIn))