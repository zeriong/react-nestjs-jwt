import React from 'react';
import {configureStore} from '@reduxjs/toolkit';
import tokenReducer from "./slices/token.slice";
import userReducer from "./slices/profile.slice";

export const store = configureStore({
    reducer: {
        token: tokenReducer,
        user: userReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch