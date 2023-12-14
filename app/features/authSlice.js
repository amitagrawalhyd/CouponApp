// app/features/authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-community/async-storage';

const initialState = {
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      AsyncStorage.setItem('user', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      AsyncStorage.removeItem('user');
    },
    checkInitialAuthState: (state) => {
      const userString = AsyncStorage.getItem('user');
      state.user = userString ? userString : null;
    },
  },
});

export const { login, logout, checkInitialAuthState } = authSlice.actions;
export default authSlice.reducer;
