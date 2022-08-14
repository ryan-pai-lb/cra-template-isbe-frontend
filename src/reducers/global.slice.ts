import {
  createSlice,
} from '@reduxjs/toolkit';
import {
  Dispatch
} from 'redux';
import { AlertColor} from '@mui/material/Alert';
export const GLOBAL_FEATURE_KEY = 'global';

export interface GlobalState  {
  locale:string;
  dialog: {
    confirm?: boolean | undefined;
    visible?: boolean;
    close?: boolean;
    backdropClose?:boolean;
    fullScreen?: boolean | undefined;
    mobileFullScreen?:boolean | undefined;
    mobileVertical?:'flex-start' | 'center' | 'flex-end' | ''
    title?: string | JSX.Element | React.FC;
    content?: string | JSX.Element | React.FC;
    contentComponent?: JSX.Element | React.FC;
    loading?: boolean | undefined;
    confirmHandle?(dispatch?:Dispatch<any>, history?:any): void |  null | unknown;
    confirmVariant?: 'contained' | 'outlined';
    confirmColor?: 'primary' | 'secondary';
    confirmText?:string;
    cancelHandle?(dispatch?:Dispatch<any>, history?:any): void | null | unknown;
    cancelVariant?: 'contained' | 'outlined';
    cancelColor?: 'primary' | 'secondary';
    cancelText?: string;
    maxWidth?: 'xs' | 'sm' | 'md' | 'lg' //[xs,sm,md,lg]
  },
  snackbar: {
    visible: boolean;
    close?: boolean;
    variant:'default' | 'success' | 'error' | 'warning' | 'info';
    anchorOrigin?: {
      vertical:'bottom' | 'top'
      horizontal:'left' | 'center' | 'right'
    },
    icon?:string;
    content?: string | JSX.Element | React.FC | null;
    snackbarComponent?: React.ReactNode ;
    action?:React.ReactNode ;
    persist?:boolean;
    preventDuplicate?:boolean;
    hideIconVariant?:boolean;
    dense?:boolean;
    autoHideDuration?:number
  },
  alert: {
    visible: boolean;
    position?: 'fixed' | 'relative' | 'absolute' | 'initial';
    severity: AlertColor;
    variant?: 'standard' | 'filled' | 'outlined';
    Icon?: React.ReactNode;
    close?: boolean;
    closeAction?():void | null | undefined;
    vertical?: 'top' | 'bottom';
    top?: number | undefined;
    bottom?: number | undefined;
    content?: string | JSX.Element | React.FC;
    animationBackground?: {
      leftColor?:string;
      rightColor?:string;
      deg?:string
    },
  },
  breadcrumbName: any;
  startUp: {
    loading:boolean;
    loaded: boolean;
  },
  loginNonce: {
    loading: boolean;
    loaded: boolean;
    data: any;
  },
  captcha: {
    loading: boolean;
    loaded: boolean;
    data: any;
  },
  meta: {
    loading: boolean;
    loaded: boolean;
    data: any;
  },
  user: {
    loading: boolean;
    loaded: boolean;
    updated: boolean;
    data: {
      current: string;
      [key:string]:any
    }
  }
  socket: any
  
}


export const initialGlobalState: GlobalState = {
  locale: 'en_us',
  dialog: {
    confirm: false,
    visible: false,
    close: false,
    backdropClose:false,
    fullScreen: false,
    mobileFullScreen:false,
    title: undefined,
    content: undefined,
    contentComponent: undefined,
    loading: false,
    confirmVariant: 'contained',
    confirmColor: 'primary',
    confirmText: 'action.confirm',
    cancelVariant: 'outlined',
    cancelColor: 'secondary',
    cancelText: 'action.cancel',
    maxWidth: 'xs'
  },
  snackbar: {
    visible: false,
    close: true,
    variant:'default',
    anchorOrigin: {
      vertical:'bottom',
      horizontal:'left'
    }
  },
  alert: {
    visible: false,
    position: 'fixed',
    severity: 'success',
    variant: 'filled',
    Icon: null,
    close: true,
    vertical: 'top',
    content: ''
  },
  breadcrumbName: {},
  startUp: {
    loading:false,
    loaded: false
  },
  loginNonce: {
    loading: false,
    loaded: false,
    data: {}
  },
  captcha: {
    loading: false,
    loaded: false,
    data: {}
  },
  meta: {
    loading: false,
    loaded: false,
    data: {}
  },
  user: {
    loading: false,
    loaded: false,
    updated: false,
    data: {
      current: 'default'
    }
  },
  socket: {}
}

export const globalSlice = createSlice({
  name: GLOBAL_FEATURE_KEY,
  initialState: initialGlobalState,
  reducers: {
   startUpRequest(state) {
    state.startUp = {
      loading: true,
      loaded: false
    }
   },
   startUpSuccess(state) {
    state.startUp = {
      loading: false,
      loaded: true
    }
   },
   startUpFail(state) {
    state.startUp = {
      loading: false,
      loaded: true
    }
   },
   getMetaRequest(state) {
    state.meta = {
      loading: true,
      loaded: false,
      data: {}
    }
   },
   getMetaSuccess(state,action) {
    state.meta = {
      loading: false,
      loaded: true,
      data: action.payload
    }
   },
   getMetaFail(state) {
    state.meta = {
      loading: false,
      loaded: false,
      data:{}
    }
   },
   getUserInfoRequest(state) {
    state.user = {
      loaded: false,
      loading: true,
      updated: false,
      data: {
        current: 'default'
      }
    }
   },
   getUserInfoSuccess(state,action) {
      state.user = {
        ...state.user,
        loaded: true,
        loading: false,
        data: {
          current: 'default',
          ...action.payload
        }
      }
    },
    getUserInfoFail(state) {
      state.user = {
        ...state.user,
        loaded: false,
        loading: false,
        data: {
          current: 'default'
        },
      }
    
    },
    toogleDialog(state, action) {
      let globalDialogSettings = { ...state.dialog };

      if(action.payload.visible) {
        globalDialogSettings = {
          confirm: false,
          close: false,
          backdropClose:false,
          mobileFullScreen:false,
          mobileVertical:'',
          title: undefined,
          loading: false,
          content: undefined,
          contentComponent: undefined,
          confirmHandle: undefined,
          confirmVariant: 'contained',
          confirmColor: 'primary',
          confirmText: 'action.confirm',
          cancelHandle: undefined,
          cancelVariant: 'outlined',
          cancelColor: 'secondary',
          cancelText: 'action.cancel',
          maxWidth: 'xs'
        }
      }
        
      globalDialogSettings = {
        ...globalDialogSettings,
        ...action.payload
      }
      state.dialog = {
        ...state.dialog,
        ...globalDialogSettings
      }
    },
    snackbarRequest(state, action) {
      let snackbarSettings = { ...state.snackbar };

      if (action.payload.visible) {
        snackbarSettings = {
          ...snackbarSettings,
          autoHideDuration: 3000,
          content: null,
          snackbarComponent: null,
          action: undefined,
          hideIconVariant: false,
          close: false,
          persist: false,
        };
      }
      snackbarSettings = {
        ...snackbarSettings,
        ...action.payload,
      };
      state.snackbar = {
        ...state.snackbar,
        ...snackbarSettings
      };
    },
  },
});

/*
 * Export reducer for store configuration.
 */
export const globalReducer = globalSlice.reducer;
export const globalActions = globalSlice.actions;