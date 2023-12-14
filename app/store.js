import { configureStore } from '@reduxjs/toolkit';
import authReducer, { checkInitialAuthState } from './features/authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

store.dispatch(checkInitialAuthState());

export default store;
