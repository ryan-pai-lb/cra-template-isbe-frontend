import {useSelector, useDispatch } from 'react-redux';
import { globalActions } from '@/reducers/global.slice';
import { Dialog , Snackbar} from '@/uiComponents';
import { useNavigate } from "react-router-dom";

export const appLoader = async() => {
  return null
}

const AppPlugins = () => {
  const global = useSelector( (state:any) => state.global);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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