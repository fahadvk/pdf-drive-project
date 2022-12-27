import { createSlice } from '@reduxjs/toolkit';

export const loaderSlice = createSlice({
  name: 'loader',
  initialState: {
    loading: false,
  },
  reducers: {
    changeLoad: (state,action) => {
      state.loading = action.payload
    },
  },
});

export const {changeLoad} = loaderSlice.actions