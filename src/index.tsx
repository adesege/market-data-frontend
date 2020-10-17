import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Index from './pages/index';

const App = () => (
  <Index />
);

const wrapper = document.getElementById('app');
ReactDOM.render(<App />, wrapper);
