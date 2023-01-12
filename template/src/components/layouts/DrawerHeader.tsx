import React from 'react';
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useLangNavigate } from '@roswell/hooks'
import { useDispatch, useSelector } from 'react-redux';
import { 
  Box,
  IconButton,
  Typography,
  MenuItem,
  Menu
 } from '@mui/material';
import { PositionedMenu as LanguageMenu } from '@roswell/ui-components';
import { globalActions } from '@/store/global.slice';
import { getGlobal } from '@/store/states';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { languages } from '@/locales';

const DrawerHeader = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const langNavigate = useLangNavigate()
  const location = useLocation();
  const { lang } = params;
  const global = useSelector(getGlobal);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const languagesData = Object.keys(languages).map((key:string) => {
    return {
      value: languages[key].locale,
      label: languages[key].label
    }
  })

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box display="flex" alignItems="center" width={1}>
      <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
        Drawer Plugins
      </Typography>
      <Box display="flex" alignItems="center">
        <Box>
          <LanguageMenu 
            options={{data: languagesData, defaultValue: global.locale}} 
            onChange={(item) => {
              const langPath = `/${item.value}${lang ? location.pathname.replace(`/${lang}`, '') : location.pathname}`
              dispatch(globalActions.changeLanguage(item.value));
              navigate(langPath)
        }}/></Box>
        <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => {
              localStorage.removeItem('auth-token')
              langNavigate('/user')
            }}>LOGOUT</MenuItem>
          </Menu>
      </Box>
    </Box>
  )
}

export default DrawerHeader;