import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {useAxios} from "../../hooks/useAxios";

export interface userState {
    info: {
        name: string | null,
        email: string | null,
        mobile: string | null,
        password: string | null,
        type: string | null,
    }
}
const initUserState: userState = {
    info: {
        name: null,
        email: null,
        mobile: null,
        password: null,
        type: null,
    }
}

export const setProfile = createAsyncThunk(
    'user/setProfile',
    async (arg, { rejectWithValue }) => {
        console.log("썽크 접근");
        try {
            console.log("트라이 접근");
            const { data } = await useAxios().post(
                '/user/profile',
                {
                    withCredentials: true,
                },
            )
            return data;
        }
        catch (error) {
            console.log("에러 접근",error);
            rejectWithValue(error);

        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState: initUserState,
    reducers: {
        SET_USER: (state: userState, { payload }) => {
            state.info = payload;
            console.log('userSlice:', state)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(setProfile.pending, (state, action) => {
            console.log("팬딩",action.payload);
            state.info = action.payload;
        });
        builder.addCase(setProfile.fulfilled, (state, action) => {
            console.log("풀필드",state.info);
            state.info = action.payload;
        });
        builder.addCase(setProfile.rejected, (state, action) => {
            console.log("리젝트",action.payload);
        });
    }
});

export const { SET_USER } = userSlice.actions;

export default userSlice.reducer;