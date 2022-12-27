import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userName: '',
    userId: '',
    email: '',
  },
  reducers: {
    setName: (state, action) => {
      state.userName = action.payload;
    },
    setId: (state, action) => {
      state.userId = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
  },
});

export const {setEmail,setId,setName} = authSlice.actions