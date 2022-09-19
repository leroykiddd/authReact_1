import React from 'react';
import { hot } from 'react-hot-loader/root';
import App from './App';
import { Provider } from 'react-redux';
import { setupStore } from './store';
import { BrowserRouter } from 'react-router-dom';
import { Theme, presetGpnDefault } from '@consta/uikit/Theme';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const store = setupStore();

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Theme preset={presetGpnDefault}>
          <App />
        </Theme>
        <ToastContainer theme="colored" />
      </BrowserRouter>
    </Provider>
  );
};

export default hot(AppWrapper);
