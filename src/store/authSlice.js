// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  username: null,
  isAuthChecked: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
        console.log("loginSuccess reducer called with:", action.payload); // ← 追加
        state.token = action.payload.token;
        state.username = action.payload.username;
        state.isAuthChecked = true;
      },
    logout: (state) => {
      state.token = null;
      state.username = null;
      state.isAuthChecked = true;
    },
    authChecked: (state,action) => {
      console.log('loginSuccess reducer called with:', action.payload); // ★追加
      state.isAuthChecked = true;
    }
  },
});

export const { loginSuccess, logout, authChecked } = authSlice.actions;
export default authSlice.reducer;
