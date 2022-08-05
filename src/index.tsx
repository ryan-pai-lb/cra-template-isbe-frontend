import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import ProjectConfig from './project.config.json';
import { Provider } from 'react-redux';
import reducers from './reducers';
import appSagas from './sagas'
import reportWebVitals from './reportWebVitals';
import RoutesJSON from './router/routes.json';
import { loadableComponent } from './utils/loadableComponent';
import LayoutLoading from './components/LayoutLoading';
import PageLoading from './components/PageLoading';
import locales from './locales';
import createStore from './reducers/store';

const routes = loadableComponent({routes: RoutesJSON, LayoutLoading: <LayoutLoading/>, PageLoading: <PageLoading/>});
const store = createStore({appConfig: ProjectConfig, appReducers: reducers, appSagas});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App {...{config: ProjectConfig, routes, appLocales: locales}}/>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
