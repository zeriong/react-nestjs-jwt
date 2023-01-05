import {createSlice} from "@reduxjs/toolkit";

export interface userState {
    info: {
        name: string | null,
        email: string | null,
        mobile: string | null,
        password: string | null,
    }
}
const initUserState: userState = {
    info: {
        name: null,
        email: null,
        mobile: null,
        password: null,
    }
}

const userSlice = createSlice({
    name: 'user',
    initialState: initUserState,
    reducers: {
        SET_USER: (state: userState, action) => {
            state.info = action.payload;
            console.log('userSlice:', state)
        }
    },
});

export const { SET_USER } = userSlice.actions;

export default userSlice.reducer;