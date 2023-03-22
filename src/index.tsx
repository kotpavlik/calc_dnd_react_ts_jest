import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import { store } from './state_manager/store';
import { ErrorSnackbar } from './components/error_snack_bar/ErrorSnackBar';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <ErrorSnackbar />
    <App />
  </Provider>
);

reportWebVitals();
