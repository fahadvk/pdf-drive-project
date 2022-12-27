import { createSlice } from '@reduxjs/toolkit';

export const FileSlice = createSlice({
  name: 'files',
  initialState: {
    files: [],
  },
  reducers: {
    setfiles: (state,action) => {
      state.files = action.payload
    },
  },
});

export const {setfiles} = FileSlice.actions