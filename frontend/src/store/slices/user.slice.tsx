import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Api} from "../../utile/api";

export interface userState {
    data: {
        name: string | null,
        email: string | null,
        mobile: string | null,
        password: string | null,
    },
    loading: boolean,
}
const initUserState: userState = {
    data: {
        name: "",
        email: null,
        mobile: null,
        password: null,
    },
    loading: true,
}

export const sendMyProfile = createAsyncThunk(
    'user/sendMyProfile',
    async (_, thunkAPI) => {
        try {
            const response = await Api().get('/user/profile')

            if (!response) {
                return thunkAPI.rejectWithValue(null);
            }

            return response.data;
        }
        catch (err) {
            return thunkAPI.rejectWithValue(err);
        }
    }
);

export const userSlice = createSlice({
    name: 'user',
    initialState: initUserState,
    reducers: {
        SET_USER: (state: userState, { payload }) => {
            state.data = payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(sendMyProfile.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(sendMyProfile.fulfilled, (state, action) => {
            state.data = action.payload;
            state.loading = false;
        });
        /*builder.addCase(setProfile.rejected, (state, action) => {
            state.loading = true;
            console.log("썬크 리젝트", action.error);
        });*/
    }
});

export const { SET_USER } = userSlice.actions;