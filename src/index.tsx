import axios from 'axios';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import './assets/css/app.css';
import './assets/css/styles.scss';
import AppLoader from './components/app/AppLoader';
import { AUTH_USER_PAYLOAD_KEY } from './constants';
import { IFlashTypes } from './interfaces/flash';
import { IRoute } from './interfaces/route';
import store from './store';
import { logout, setCurrentUser } from './store/auth';
import { showFlash } from './store/flash';
import { getAuthToken } from './utils';
import setAuthorizationToken from './utils/setAuthorizationToken';

axios.defaults.baseURL = process.env.API_BASE_URL;
axios.interceptors.response.use((response) => response, (error) => {
  if (error.response.status === 401) {
    store.dispatch(logout());
  }
  store.dispatch(showFlash({
    type: IFlashTypes.error,
    messages: error.response.data.message ? error.response.data.message : error.response.data,
  }));
  return Promise.reject(error);
});

if (getAuthToken()) {
  setAuthorizationToken(getAuthToken());
  store.dispatch(setCurrentUser({
    user: JSON.parse(localStorage.getItem(AUTH_USER_PAYLOAD_KEY)),
  }));
}

const DefaultLayout = React.lazy(() => import(/* webpackChunkName: "layouts/default-layout" */ './layouts/DefaultLayout'));
const AdminDashboardLayout = React.lazy(() => import(/* webpackChunkName: "layouts/admin-dashboard" */ './layouts/AdminDashboardLayout'));
const ManageMarket = React.lazy(() => import(/* webpackChunkName: "pages/dashboard/markets/manage" */ './pages/Dashboard/Markets/Manage'));
const Markets = React.lazy(() => import(/* webpackChunkName: "pages/dashboard/markets" */ './pages/Dashboard/Markets'));
const Login = React.lazy(() => import(/* webpackChunkName: "pages/login" */ './pages/Login'));
const Main = React.lazy(() => import(/* webpackChunkName: "pages/main" */ './pages/Main'));

const App = () => (
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <React.Suspense fallback={<div className="flex items-center h-full"><AppLoader /></div>}>
          <Switch>
            <Route
              exact
              path={IRoute.main}
              render={() => <DefaultLayout component={Main} />}
            />
            <Route
              exact
              path={IRoute.login}
              component={Login}
            />
            <Route
              exact
              path={IRoute.addMarket}
              render={() => <AdminDashboardLayout component={ManageMarket} />}
            />
            <Route
              exact
              path={IRoute.editMarket}
              render={() => <AdminDashboardLayout component={ManageMarket} />}
            />
            <Route
              exact
              path={IRoute.market}
              render={() => <AdminDashboardLayout component={Markets} />}
            />
          </Switch>
        </React.Suspense>
      </Router>
    </Provider>
  </React.StrictMode>
);

const wrapper = document.getElementById('app');
ReactDOM.render(<App />, wrapper);
