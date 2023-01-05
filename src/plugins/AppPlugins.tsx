import {useSelector, useDispatch } from 'react-redux';
import { globalActions } from '@/reducers/global.slice';
import { Dialog , Snackbar} from '@/uiComponents';
import useRouteNavigate from '@/hooks/useRouteNavigate'
import { AppDispatch } from '@/reducers/store';
import { EnhancedStore } from '@reduxjs/toolkit';
import { Params } from 'react-router-dom';
import { languages } from '@/locales';
import _ from 'lodash';

export const appLoader = async({store, request, params}:{store:EnhancedStore, request:Request, params:Params}) => {
  const dispatch:AppDispatch = store.dispatch;
  const { lang } = params;
  const langsKeys = _.values(languages);
  
  if(lang) {
    const currentLang = langsKeys.find(item => {
      const keys = item.keys.split('|');
      return keys.includes(lang)
    });

    if(currentLang?.locale) {
      dispatch(globalActions.changeLanguage(currentLang?.locale))
    }
   
  }
  return null;
}

const AppPlugins = () => {
  const global = useSelector( (state:any) => state.global);
  const dispatch = useDispatch();
  const navigate = useRouteNavigate();

  return (
    <>
      <Dialog 
        options={global.dialog} 
        configs={{
          "dialogBorder": true,
          "actionFullWidth": true,
          "actionColumn": true,
          "actionColumnReverse": false,
          "buttonSize": "large"
        }}
        onClose = {() => {
          dispatch(globalActions.toogleDialog({visible: false}))
        }}
        onConfirm={() => {
          if(typeof global.dialog.confirmHandle === 'function') {
            global.dialog.confirmHandle(dispatch, navigate)
          } else {
            dispatch(globalActions.toogleDialog({visible: false}))
          }
        }}
        onCancel={() => {
          if(typeof global.dialog.cancelHandle === 'function') {
            global.dialog.cancelHandle(dispatch, navigate)
          } else {
            dispatch(globalActions.toogleDialog({visible: false}))
          }
        }}
      />
      <Snackbar
        options={global.snackbar}
        configs={{
          onlyUseDefaultBackground: false,
          anchorOrigin: {
            vertical: "bottom", 
            horizontal: "left"
          },
          autoHideDuration: 3000,
          contentColor: "#fff"
        }}
        onClose={() => {
          // dispatch(globalActions.snackbarRequest({visible: false}))
        }}
      />
    </>
  )
}

export default AppPlugins;