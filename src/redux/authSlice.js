import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        login: {
            currentUser: null,
            isFetching: false,
            error: false,
        },
        register: {
            isFetching: false,
            error: false,
            success: false,
        },
        logout: {
            isFetching: false,
            error: false,
        },
        msgLogin: '',
        msgRegister: '',
    },

    reducers: {
        loginStart: (state) => {
            state.login.isFetching = true;
        },
        loginSuccess: (state, action) => {
            state.login.isFetching = false;
            state.login.currentUser = action.payload;
            state.login.error = false;
            state.msgLogin = '';
            state.msgRegister = '';
        },

        loginFailed: (state, action) => {
            state.login.isFetching = false;
            state.login.error = true;
            state.msgLogin = action.payload;
        },

        registerStart: (state) => {
            state.register.isFetching = true;
        },
        registerSuccess: (state) => {
            state.register.isFetching = false;
            state.register.error = false;
            state.register.success = true;
            state.msgLogin = '';
            state.msgRegister = '';
        },
        registerFailed: (state, action) => {
            state.register.isFetching = false;
            state.register.error = true;
            state.register.success = false;
            state.msgRegister = action.payload;
        },
        logoutStart: (state) => {
            state.logout.isFetching = true;
        },
        logoutSuccess: (state) => {
            state.logout.isFetching = false;
            state.login.currentUser = null;
            state.logout.error = false;
            state.msgLogin = '';
            state.msgRegister = '';
        },

        logoutFailed: (state, action) => {
            state.logout.isFetching = false;
            state.logout.error = true;
        },
    },
});

export const {
    loginStart,
    loginFailed,
    loginSuccess,
    registerStart,
    registerSuccess,
    registerFailed,
    logoutStart,
    logoutSuccess,
    logoutFailed,
} = authSlice.actions;

export default authSlice.reducer;
