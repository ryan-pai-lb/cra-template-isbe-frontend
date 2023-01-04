import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, } from 'react-router-dom';
import { createRouter } from './router';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import store from './reducers/store';
import AppLoading from '@/components/AppLoading';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const router = createRouter(store);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} fallbackElement={<AppLoading/>}/>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
