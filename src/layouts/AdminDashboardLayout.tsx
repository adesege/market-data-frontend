import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { AuthState, IRoles } from '../interfaces/auth';
import { IFlashTypes } from '../interfaces/flash';
import { IRoute } from '../interfaces/route';
import { AppDispatch, RootState } from '../store';
import { showFlash } from '../store/flash';
import DefaultLayout from './DefaultLayout';

const AdminDashboard = (props: { component: React.FC<AuthState> }) => {
  const authState = useSelector<RootState, AuthState>((state) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  if (!authState.isAuthenticated) {
    return <Redirect to={IRoute.login} />;
  }

  if (!authState.user.roles.includes(IRoles.ADMIN)) {
    dispatch(showFlash({
      type: IFlashTypes.error,
      messages: ['You don\'t have permission to view that page'],
    }));
    return <Redirect to={IRoute.main} />;
  }

  return <DefaultLayout component={props.component} mainClassName="container px-4" />;
};

export default AdminDashboard;
