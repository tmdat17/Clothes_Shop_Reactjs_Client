import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        update: {
            isFetching: false,
            error: false,
            success: false,
        },
    },
    reducers: {
        updateStart: (state) => {
            state.update.isFetching = true;
        },
        updateSuccess: (state) => {
            state.update.isFetching = false;
            state.update.error = false;
            state.update.success = true;
        },
        updateError: (state) => {
            state.update.isFetching = false;
            state.update.success = false;
            state.update.error = true;
        },
    },
});

export const { updateStart, updateSuccess, updateError } = userSlice.actions;

export default userSlice.reducer;
