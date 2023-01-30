import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { createRouter } from './router';
import {
  CssBaseline
} from '@mui/material';
import { combineComponents } from '@/utils/combineComponents';
import reportWebVitals from './reportWebVitals';
import store from './store';
import AppLoading from '@/components/AppLoading';
import contexts from '@/contexts';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const router = createRouter(store);
const AppProviders = combineComponents(...contexts);

root.render(
  <React.StrictMode>
    <AppProviders>
      <>
        <CssBaseline/>
        <RouterProvider router={router} fallbackElement={<AppLoading/>}/>
      </>
    </AppProviders>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
