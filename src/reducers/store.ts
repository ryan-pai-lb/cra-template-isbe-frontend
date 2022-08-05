import { configureStore } from '@reduxjs/toolkit';
import { all } from 'redux-saga/effects'
import createSagaMiddleware  from 'redux-saga';
import logger from "redux-logger";
import {globalReducer, GLOBAL_FEATURE_KEY} from './global.slice';
import {globalSagaInit} from '../sagas/globalSaga';

export const createStore = (option:{appReducers:any; appSagas: any[]; appConfig:any}) => {
  const globalSaga = globalSagaInit({appConfig: option.appConfig})
  function* rootSaga() {
    yield all(
      [
        ...option.appSagas,
        ...globalSaga
      ]
    )
  }

  const sagaMiddleware = createSagaMiddleware();
  const store = configureStore({
    reducer:  {
      ...option.appReducers,
      [GLOBAL_FEATURE_KEY]: globalReducer
    },
    // Additional middleware can be passed to this array
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}).concat(window.Config.NODE_ENV !== 'production' ? [logger, sagaMiddleware] : [sagaMiddleware]),
    devTools: window.Config.NODE_ENV !== 'production',
    // Optional Redux store enhancers
    enhancers: [],
  });
  sagaMiddleware.run(rootSaga);

  return store;
}

export default createStore;

