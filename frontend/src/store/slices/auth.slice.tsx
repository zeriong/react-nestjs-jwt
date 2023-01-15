import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Api, REFRESH_TOKEN_PATH} from "../../utile/api";

export interface AuthState {
    data: {
        isLoggedIn: boolean,
        accessToken: string,
        signupError: string,
        signinError: string,
        modifyError: string,
    }
    loading: boolean,
}

const initAuthState: AuthState = {
    data: {
        isLoggedIn: false,
        accessToken: '',
        signupError: '',
        signinError: '',
        modifyError: '',
    },
    loading: true,
}

export const sendLogout = createAsyncThunk(
    'user/sendLogout',
    async (_, thunkAPI) => {
        try {
            const response = await Api().get('/auth/logout');
            if (!response || !response.data) {
                return thunkAPI.rejectWithValue(null);
            }
            return response.data;
        }
        catch (err) {
            return thunkAPI.rejectWithValue(err);
        }
    }
);

export const sendRefreshAccessToken = createAsyncThunk(
    'user/sendRefreshAccessToken',
    async (_, thunkAPI) => {
        try {
            const response = await Api().get(REFRESH_TOKEN_PATH);

            if (!response || !response.data) {
                return thunkAPI.rejectWithValue(null);
            }

            return response.data;
        }
        catch (err) {
            return thunkAPI.rejectWithValue(err);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: initAuthState,
    reducers: {
        SET_LOGIN: (state: AuthState, action: PayloadAction<string>) => {
            state.data.accessToken = action.payload;
            localStorage.setItem('at', state.data.accessToken);
            state.data.isLoggedIn = true;
        },
        SET_LOGOUT: (state: AuthState) => {
            state.data.accessToken = '';
            localStorage.setItem('at', '');
            state.data.isLoggedIn = false;
        },
        SIGNIN_ERROR: (state: AuthState, action: PayloadAction<string>) => {
            state.data.signinError = action.payload;
        },
        SIGNUP_ERROR: (state: AuthState, action: PayloadAction<string>) => {
            state.data.signupError = action.payload;
        },
        MODIFY_ERROR: (state: AuthState, action: PayloadAction<string>) => {
            state.data.modifyError = action.payload;
        },
    },
    extraReducers: (builder) => {
        // sendRefreshAccessToken
        builder.addCase(sendRefreshAccessToken.fulfilled, (state: AuthState, action) => {
            if (action.payload.success) {
                state.data.isLoggedIn = true;
                state.data.accessToken = action.payload.accessToken;
                localStorage.setItem('at', state.data.accessToken);
                state.loading = false;
            }
        });
        builder.addCase(sendRefreshAccessToken.rejected, (state: AuthState, action) => {
            state.loading = false;
        });
        // sendLogout
        builder.addCase(sendLogout.fulfilled, (state: AuthState, action) => {
            if (action.payload.success) {
                state.data.isLoggedIn = false;
                state.data.accessToken = '';
                localStorage.setItem('at', '');
            }
        });
    }
})

export const { SET_LOGIN, SET_LOGOUT, SIGNIN_ERROR, SIGNUP_ERROR, MODIFY_ERROR } = authSlice.actions;

export default authSlice.reducer;