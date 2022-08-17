import React from 'react';
import { useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { 
  Box,
  IconButton,
  Typography,
  MenuItem,
  Menu
 } from '@mui/material';
import { PositionedMenu as LanguageMenu } from '@/uiComponents';
import { globalActions } from '@/reducers/global.slice';
import { getGlobal } from '@/reducers/states';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Locales from '@/locales';

const DrawerHeader = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const global = useSelector(getGlobal);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const languagesData = Object.keys(Locales).map((key:string) => {
    return {
      value: Locales[key].locale,
      label: Locales[key].label
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
            dispatch(globalActions.changeLanguage(item.value))
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
              dispatch(globalActions.getUserInfoFail())
              navigate('/user/login')
            }}>Signin</MenuItem>
          </Menu>
      </Box>
    </Box>
  )
}

export default DrawerHeader;