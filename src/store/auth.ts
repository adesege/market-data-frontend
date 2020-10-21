import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Dispatch } from 'react';
import { AUTH_TOKEN_KEY, AUTH_USER_PAYLOAD_KEY } from '../constants';
import { AuthState, ILoginState, ISetCurrentUser } from '../interfaces/auth';
import setAuthorizationToken from '../utils/setAuthorizationToken';

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: { roles: [] }, isAuthenticated: false } as AuthState,
  reducers: {
    setCurrentUser(state: AuthState, action: PayloadAction<ISetCurrentUser>) {
      const { user } = action.payload;

      state.user = user;
      state.isAuthenticated = user === null ? false : !!Object.keys(user).length;
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
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_USER_PAYLOAD_KEY);
  setAuthorizationToken('');
  return dispatch(setCurrentUser({ user: null }));
};

export default authSlice.reducer;
