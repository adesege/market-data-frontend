import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { AuthState, IRoles } from '../interfaces/auth';
import { IFlashTypes } from '../interfaces/flash';
import { IRoute } from '../interfaces/route';
import { RootState } from '../store';
import { showFlash } from '../store/flash';

const AdminDashboard = (props: { component: React.FC<AuthState> }) => {
  const Component = props.component;
  const authState = useSelector<RootState, AuthState>((state) => state.auth);
  const dispatch = useDispatch();

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

  return (
    <>
      <header className="bg-blue-900 text-white px-10 py-5 w-full absolute">
        <span className="font-bold">Market Data</span>
      </header>
      <main className="container h-full px-4 pt-20">
        <Component {...authState} />
      </main>
    </>
  );
};

export default AdminDashboard;
