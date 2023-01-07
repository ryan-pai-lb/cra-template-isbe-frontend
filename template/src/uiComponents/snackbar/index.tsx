import React, { useEffect, useState } from 'react';
import { 
  Icon,
  IconButton,
  Box
 } from '@mui/material';
import { useSnackbar, SnackbarProvider, SnackbarKey, SnackbarContentCallback } from 'notistack';
import _ from 'lodash';
import { FormattedMessage} from 'react-intl';
import { makeStyles } from '@mui/styles';
import { useTheme, Theme, createTheme, ThemeProvider} from '@mui/material/styles';
import { defaultTheme as BasicTheme } from '@/styles'; 


export type SnackbarProps = {
  configName?:string;
  themeName?:string;
  options:SnackbarOptions;
  overrideTheme?: Theme
  configs:SnackbarConfigs;
  onClose(): void;
}

export type SnackbarConfigs = {
  onlyUseDefaultBackground: boolean;
  anchorOrigin: {
    vertical: 'bottom' | 'top'; 
    horizontal: 'left' | 'center' | 'right';
  };
  autoHideDuration: number;
  contentColor: string;
}

export type SnackbarOptions = {
  visible?: boolean;
  close?: boolean;
  variant:'default' | 'success' | 'error' | 'warning' | 'info';
  anchorOrigin?: {
    vertical:'bottom' | 'top'
    horizontal:'left' | 'center' | 'right'
  },
  icon?:string;
  content?: string | React.FC | null;
  snackbarComponent?: SnackbarContentCallback;
  action?:React.ReactNode;
  persist?:boolean;
  preventDuplicate?:boolean;
  hideIconVariant?:boolean;
  dense?:boolean;
  autoHideDuration?:number
}

const useStyles = makeStyles((theme: Theme) => ({
  containerRoot: {
    color: `${theme.palette.default.contrastText} !important`,
  },
  variantSuccess: {
    backgroundColor: `${theme.palette.success.main} !important`
  },
  variantError: {
    backgroundColor: `${theme.palette.error.main} !important`
  },
  variantWarning: {
    backgroundColor: `${theme.palette.warning.main} !important`
  },
  variantInfo: {
    backgroundColor: `${theme.palette.info.main} !important`
  }
}));

const VariantIcon = {
  default: '',
  success: 'check_circle',
  info: 'info',
  warning: 'error',
  error: 'cancel'
}

const LBSnackbarContent = (props:SnackbarProps) => {
  const { options, configs , onClose } = props;
  const [isOpen, setOpen] = useState(false)
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const theme = useTheme();
  const snackbarSetting : SnackbarOptions  = options ;

  const onClickDismiss = (key:SnackbarKey) => () => { 
    closeSnackbar(key)
  }

  useEffect(() => {
    if(!isOpen) {
      onClose()
    }
  }, [isOpen])

  useEffect(() => {
    if(snackbarSetting.visible && !snackbarSetting.preventDuplicate || (snackbarSetting.preventDuplicate && !isOpen)) {
      setOpen(true)
      enqueueSnackbar(
        <Box display="flex" alignItems="center" justifyContent="space-between" >
          <Box display="flex">
            {
              !snackbarSetting.hideIconVariant && (snackbarSetting.icon || VariantIcon[snackbarSetting.variant]) &&
              <Box color={!snackbarSetting.variant || snackbarSetting.variant === 'default' || !configs.onlyUseDefaultBackground ? configs.contentColor : theme.palette[snackbarSetting.variant].main} display="flex" mr={1}>
                <Icon fontSize="small">{snackbarSetting.icon || VariantIcon[snackbarSetting.variant]}</Icon>
              </Box>
            }
            <Box color={configs.contentColor}>
              {
                typeof snackbarSetting.content === 'object' && React.isValidElement(snackbarSetting.content) && snackbarSetting.content
              }
              {
                snackbarSetting.content && (typeof snackbarSetting.content  === 'function' || ( typeof snackbarSetting.content  === 'object' && !React.isValidElement(snackbarSetting.content ))) && <snackbarSetting.content/>
              }
              {
                ( snackbarSetting.content && typeof snackbarSetting.content === 'string') && <Box whiteSpace="pre-line"><FormattedMessage id={snackbarSetting.content} defaultMessage={snackbarSetting.content} /></Box>
              }
            </Box>
          </Box>
        </Box>,{
        variant: configs.onlyUseDefaultBackground ? 'default' : snackbarSetting.variant,
        anchorOrigin: snackbarSetting.anchorOrigin || configs.anchorOrigin || {vertical: 'bottom', horizontal: 'left'},
        persist: snackbarSetting.persist,
        preventDuplicate: snackbarSetting.preventDuplicate,
        content: snackbarSetting.snackbarComponent,
        autoHideDuration: snackbarSetting.autoHideDuration || configs.autoHideDuration || 3000,
        action: snackbarSetting.action || snackbarSetting.close && function(key) {
          return (
            <Box color={configs.contentColor}><IconButton onClick={onClickDismiss(key)} color="inherit">
              <Icon fontSize="small">close</Icon>
            </IconButton></Box>
          )
        },
        onExited: () => {
          setOpen(false)
        }
      });
    }
  }, [snackbarSetting])
  return (
    <></>
  )
}

const LBSnackbar = (props:SnackbarProps) => {
  const { themeName, overrideTheme} = props;
  const classes = useStyles()
  const componentTheme = themeName 
  const defaultTheme = createTheme(_.defaultsDeep(componentTheme,BasicTheme))
  const theme:any = createTheme(_.defaultsDeep({
    overrides: {}
  },overrideTheme || defaultTheme));

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        classes={{
          containerRoot: classes.containerRoot,
          variantSuccess: classes.variantSuccess,
          variantError: classes.variantError,
          variantWarning: classes.variantWarning,
          variantInfo: classes.variantInfo,
        }}
        maxSnack={3}
        hideIconVariant={true}
      >
        <LBSnackbarContent
          {...props}
        ></LBSnackbarContent>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default LBSnackbar
