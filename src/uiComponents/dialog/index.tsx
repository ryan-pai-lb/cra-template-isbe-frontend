import React from 'react';
import clsx from 'clsx';
import {
  Dispatch
} from 'redux';
import {FormattedMessage} from 'react-intl';
import _ from 'lodash';
import { 
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Box,
  CircularProgress,
  Icon,
  IconButton,
  useMediaQuery
 } from '@mui/material';
 import { makeStyles } from '@mui/styles';
import { ThemeProvider, createTheme, Theme} from '@mui/material/styles';
import { defaultTheme as BasicTheme } from '@/styles'; 

export type DialogProps = {
  options:DialogOptions;
  overrideTheme?: Theme;
  configs?:DialogConfigs;
  onClose(): void;
  onConfirm(): void;
  onCancel(): void;
}

export type DialogConfigs ={
  dialogBorder?: boolean;
  titleBorder?: boolean;
  actionBorder?: boolean;
  actionFullWidth?: boolean;
  actionColumn?: boolean;
  actionColumnReverse?: boolean;
  buttonSize?: 'large' | 'medium' | 'small';
}

export type DialogOptions = {
  confirm?: boolean | undefined;
  visible?: boolean;
  close?: boolean;
  closeHandle?(dispatch?:Dispatch<any>, history?:any): void |  null | undefined | unknown;
  backdropClose?:boolean;
  fullScreen?: boolean | undefined;
  mobileFullScreen?:boolean | undefined;
  mobileVertical?:'flex-start' | 'center' | 'flex-end'
  title?: string | React.FC;
  content?: string | React.FC;
  contentComponent?: React.FC;
  loading?: boolean | undefined;
  confirmHandle?(dispatch?:Dispatch<any>, history?:any): void |  null | undefined | unknown;
  confirmVariant?: 'contained' | 'outlined';
  confirmColor?: 'primary' | 'secondary';
  confirmText?:string;
  cancelHandle?(dispatch?:Dispatch<any>, history?:any): void | null | undefined | unknown;
  cancelVariant?: 'contained' | 'outlined';
  cancelColor?: 'primary' | 'secondary';
  cancelText?: string;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' //[xs,sm,md,lg]
}

const useStyles = makeStyles((theme:Theme) => {
  return {
    itemGroup: {
      display: 'flex',
      margin: -theme.spacing(1),
      '& > *': {
        margin: theme.spacing(1),
      }
    },
    
    columnGroup: {
      display: 'flex',
      flexDirection: 'column',
      margin: `${-theme.spacing(1)} 0`,
      '& > *': {
        margin: `${theme.spacing(1)} 0`,
      }
    },
    columnReverseGroup: {
      flexDirection: 'column-reverse',
    },
    title: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    closeBtn: {
      position: 'absolute',
      right: 16,
      top: 16
    },
  }
})


const LBDialog = (props:DialogProps) => {
  const {options, configs, overrideTheme, onClose, onConfirm, onCancel} = props;
  const componentConfig = configs || {};
  const classes = useStyles();
  const dialogSetting:DialogOptions = options ;
  const defaultTheme = createTheme(_.defaultsDeep( BasicTheme))
  const isMobileAny = useMediaQuery(defaultTheme.breakpoints.down('xs'));

  const theme = createTheme(_.defaultsDeep({
    components: {
      MuiDialog: {
        styleOverrides: {
          paper: {
            border: componentConfig.dialogBorder ? `1px solid ${defaultTheme.palette.border.main}` : 'none'
          },
          scrollPaper: {
            alignItems: isMobileAny && dialogSetting.mobileVertical || 'center'
          },
          paperFullScreen: {
            height: isMobileAny && dialogSetting.mobileVertical ? 'initial' : '100%'
          }
        }
        
      },
      MuiDialogTitle: {
        styleOverrides: {
          root: {
            position: 'relative',
            '& > *': {
              minHeight: 30
            },
            '& + .MuiDialogContent-root': {
              paddingTop: defaultTheme.spacing(3)
            }
          }
        }
        
      },
      MuiDialogContent: {
        styleOverrides: {
          root: {
            padding: defaultTheme.spacing(3)
          }
        }
        
      },
      MuiDialogActions: {
        styleOverrides: {
          root: {
            padding: `${BasicTheme.spacing(3)} ${BasicTheme.spacing(componentConfig.actionFullWidth && !componentConfig.actionColumn ? 2 : 3)}`,
            justifyContent: componentConfig.actionFullWidth ? 'center' : 'flex-end'
          }
        }
      }
    }
  }, overrideTheme || defaultTheme));
  
  return (
    <ThemeProvider theme={theme}>
      <Dialog
        open={!!dialogSetting.visible}
        onClose={dialogSetting.backdropClose ? onClose : undefined}
        fullWidth
        fullScreen={dialogSetting.fullScreen || (isMobileAny && (!!dialogSetting.mobileVertical || dialogSetting.mobileFullScreen))}
        maxWidth={dialogSetting.maxWidth}
        >
          {
            (dialogSetting.title || dialogSetting.close) &&
            <DialogTitle
              className={clsx(classes.title)}
            >
              <>
                {
                  (dialogSetting.title && typeof dialogSetting.title === 'string') &&
                  <Box whiteSpace="pre-line">
                    <FormattedMessage id={dialogSetting.title} defaultMessage={dialogSetting.title}/>
                  </Box>
                 
                }
                {
                  typeof dialogSetting.title  === 'object' && React.isValidElement(dialogSetting.title ) &&  dialogSetting.title  
                }
                {
                  (typeof dialogSetting.title  === 'function' || ( typeof dialogSetting.title  === 'object' && !React.isValidElement(dialogSetting.title ))) && <dialogSetting.title />
                }
                {
                  dialogSetting.close &&
                  <IconButton
                    data-test="dialog-close-btn"
                    className={clsx(classes.closeBtn)}
                    onClick={onClose} size="small"
                  >
                    <Icon>close</Icon>
                  </IconButton>
                }
              </>
            </DialogTitle>
          }
          {
          !dialogSetting.contentComponent && dialogSetting.content &&
            <DialogContent dividers={componentConfig.dialogBorder}>
            
                <>
                  {
                    typeof dialogSetting.content  === 'object' && React.isValidElement(dialogSetting.content ) &&  dialogSetting.content  
                  }
                  {
                    (typeof dialogSetting.content  === 'function' || ( typeof dialogSetting.content  === 'object' && !React.isValidElement(dialogSetting.content ))) && <dialogSetting.content />
                  }
                  {
                    typeof dialogSetting.content === 'string' && <Box whiteSpace="pre-line"><FormattedMessage id={dialogSetting.content} defaultMessage={dialogSetting.content}/></Box>
                  }
                </>
            
              
            </DialogContent>
           }
          {
            typeof dialogSetting.contentComponent  === 'object' && React.isValidElement(dialogSetting.contentComponent ) &&  dialogSetting.contentComponent  
          }
          {
            (typeof dialogSetting.contentComponent  === 'function' || ( typeof dialogSetting.contentComponent  === 'object' && !React.isValidElement(dialogSetting.contentComponent ))) && <dialogSetting.contentComponent />
          }
        {
          !dialogSetting.contentComponent &&
            <DialogActions disableSpacing>
              <Box display="flex" className={clsx({
                [classes.itemGroup]: !componentConfig.actionColumn,
                [classes.columnGroup]: componentConfig.actionColumn,
                [classes.columnReverseGroup]: componentConfig.actionColumnReverse,
              })} width={componentConfig.actionFullWidth ? 1 : 'initial'}>
                {
                  dialogSetting.confirm &&
                  
                    <Button size={componentConfig.buttonSize || 'medium'} data-test="dialog-button-cancel" fullWidth disabled={dialogSetting.loading} variant={dialogSetting.cancelVariant || 'outlined'} color={dialogSetting.cancelColor || 'secondary'} onClick={onCancel}>
                      <FormattedMessage id={dialogSetting.cancelText  || 'action.cancel'}/>
                    </Button> 
                  
                }
                <Button size={componentConfig.buttonSize || 'medium'} data-test="dialog-button-confirm" disabled={dialogSetting.loading} fullWidth variant={dialogSetting.confirmVariant || 'contained'} color={dialogSetting.confirmColor || 'primary'} onClick={onConfirm}>
                  { dialogSetting.loading && <CircularProgress size={24}/>  }
                  <FormattedMessage id={dialogSetting.confirmText  || 'action.confirm'}/>
                </Button> 
              </Box>
          </DialogActions>
        }
      </Dialog>
    </ThemeProvider>
  )
}

export default LBDialog;
