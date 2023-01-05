import React from 'react';
import {configureStore} from '@reduxjs/toolkit';
import tokenReducer from "./slices/auth";
import userReducer from "./slices/userInfo";

export const store = configureStore({
    reducer: {
        token: tokenReducer,
        user: userReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>