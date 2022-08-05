import { AxiosResponse } from 'axios'
import { put, take,  takeLatest, call } from "redux-saga/effects";
import {globalActions} from '@/reducers/global.slice';
import { getMeta, getUserInfo } from '@/serivces/globalApi'

export const globalSagaInit = (option:{appConfig:any}) => {
  const {appConfig } = option
  const enableVerifyToken = appConfig.enableVerifyToken.value;
  const enableMetaAPI =  appConfig.enableMetaAPI.value;

  function* getMetaSaga() {
    try {
      const res:AxiosResponse = yield call(getMeta);
      yield put(globalActions.getMetaSuccess(res));
    } catch (error) {
      yield put(globalActions.getMetaFail());
    }
  }
  
  function* getUserInfoSaga() {
    try {
      const res: AxiosResponse = yield call(getUserInfo);
      const accountAuth = JSON.parse(localStorage.getItem('account-auth') || '') ;
      yield put(globalActions.getUserInfoSuccess({...res,...accountAuth}));
    } catch(error) {
      yield put(globalActions.getUserInfoFail());
    }
  }
  
  function* startUpSaga() {
    try {
      const { getUserInfoRequest, getUserInfoSuccess, getUserInfoFail, getMetaRequest, getMetaSuccess, getMetaFail } = globalActions;
      if (enableVerifyToken) {
        try {
          yield put(getUserInfoRequest());
          yield take([getUserInfoFail.type, getUserInfoSuccess.type])
          
        } catch (error) {
          console.log(error)
        }
      } 
  
      if(enableMetaAPI) {
        yield put(getMetaRequest());
        yield take([getMetaSuccess.type, getMetaFail.type])
      }
      yield put(globalActions.startUpSuccess());
    } catch(error) {
      yield put(globalActions.startUpFail());
    }
  }
  
  const sagas = [
    takeLatest(globalActions.startUpRequest, startUpSaga),
    takeLatest(globalActions.getMetaRequest, getMetaSaga),
    takeLatest(globalActions.getUserInfoRequest, getUserInfoSaga)
  ]

  return sagas;
}


export default globalSagaInit