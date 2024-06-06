import React from 'react';
import store from './store';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import {ThemeProvider} from './context/ThemeContext';
import { HashRouter as Router } from 'react-router-dom';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </Router>
    </Provider>
  </React.StrictMode>
);
