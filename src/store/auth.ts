import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AuthState, ILoginState, ISetCurrentUser } from 'interfaces/auth';
import { Dispatch } from 'react';
import { AUTH_TOKEN_KEY, AUTH_USER_PAYLOAD_KEY } from '../constants';
import setAuthorizationToken from '../utils/setAuthorizationToken';

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: {}, isAuthenticated: false } as AuthState,
  reducers: {
    setCurrentUser(state: AuthState, action: PayloadAction<ISetCurrentUser>) {
      state.user = action.payload.user;
      state.isAuthenticated = !!Object.keys(action.payload.user).length;
    },
  },
});

export const { setCurrentUser } = authSlice.actions;

export const login = (formData: ILoginState) => async (
  dispatch: Dispatch<PayloadAction<ISetCurrentUser>>,
) => {
  const { data } = await axios.post('/auth/signin', formData);
  localStorage.setItem(AUTH_TOKEN_KEY, data.token);
  localStorage.setItem(AUTH_USER_PAYLOAD_KEY, JSON.stringify(data.user));
  setAuthorizationToken(data.token);
  dispatch(setCurrentUser({ user: data.user }));
};

export const logout = () => (dispatch: Dispatch<PayloadAction<ISetCurrentUser>>) => {
  localStorage.clear();
  setAuthorizationToken('');
  return dispatch(setCurrentUser({ user: null }));
};

export default authSlice.reducer;
