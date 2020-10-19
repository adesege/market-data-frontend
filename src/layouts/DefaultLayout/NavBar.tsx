import * as React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AuthState, IRoles } from '../../interfaces/auth';
import { IRoute } from '../../interfaces/route';
import { RootState } from '../../store';

const NavBar = () => {
  const authState = useSelector<RootState, AuthState>((state) => state.auth);
  const isAdmin = authState.user.roles.includes(IRoles.ADMIN);

  const navLinks = [
    {
      title: 'Home',
      to: IRoute.main,
      isVisible: true,
    },
    {
      title: 'Login',
      to: IRoute.market,
      isVisible: !authState.isAuthenticated,
    },
    {
      title: 'Dashboard',
      to: IRoute.market,
      isVisible: isAdmin,
    },
  ];

  return (
    <header className="bg-blue-900 text-white px-10 py-5 w-full absolute flex justify-between items-center">
      <span className="font-bold">Market Data</span>
      <nav className="flex">
        {navLinks
          .filter((link) => link.isVisible)
          .map((link) => <Link to={link.to} className="inline-block hover:text-blue-500 ml-5">{link.title}</Link>)}
      </nav>
    </header>
  );
};

export default NavBar;
