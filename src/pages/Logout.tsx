import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import AppLoader from '../components/app/AppLoader';
import { IRoute } from '../interfaces/route';
import { AppDispatch } from '../store';
import { logout } from '../store/auth';

const Logout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const history = useHistory();

  React.useEffect(() => {
    dispatch(logout());
    history.push(IRoute.login);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex items-center h-full">
      <AppLoader />
    </div>
  );
};

export default Logout;
