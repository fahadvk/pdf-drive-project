import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './authSlice';
import { FileSlice } from './FilesSlice';
import { loaderSlice } from './loaderSlice';

export const store = configureStore({
  reducer: {
    authReducer: authSlice.reducer,
    loadReducer: loaderSlice.reducer,
    fileReducer: FileSlice.reducer,
  },
});
