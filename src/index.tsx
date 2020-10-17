import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import './assets/css/app.css';
import './assets/css/styles.scss';
import Login from './pages/Login';

const App = () => (
  <React.StrictMode>
    <Router>
      <Switch>
        <Route
          exact
          path="/login"
          component={Login}
        />
      </Switch>
    </Router>
  </React.StrictMode>
);

const wrapper = document.getElementById('app');
ReactDOM.render(<App />, wrapper);
