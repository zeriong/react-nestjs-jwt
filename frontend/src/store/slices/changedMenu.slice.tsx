import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface IChangedMenuState {
    showMenu: boolean;
}

const initChangedMenuState: IChangedMenuState = {
    showMenu: true,
}

export const changedMenuSlice = createSlice({
    name: 'changedMenu',
    initialState: initChangedMenuState,
    reducers: {
        TOGGLE_SHOW_MENU: (state: IChangedMenuState) => {
            state.showMenu = !state.showMenu;
        },
        SET_SHOW_MENU: (state: IChangedMenuState, action: PayloadAction<boolean>) => {
            state.showMenu = action.payload;
        },
    },
})

export const { TOGGLE_SHOW_MENU, SET_SHOW_MENU } = changedMenuSlice.actions;