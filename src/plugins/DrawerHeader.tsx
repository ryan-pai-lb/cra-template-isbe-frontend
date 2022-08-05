import React from 'react';
import { useNavigate} from "react-router-dom";
import { useDispatch } from 'react-redux';
import { 
  Box,
  IconButton,
  Typography,
  MenuItem,
  Menu
 } from '@mui/material';
 import { globalActions } from '@/reducers/global.slice';
import AccountCircle from '@mui/icons-material/AccountCircle';

const DrawerHeader = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <Box display="flex" alignItems="center" width={1}>
      <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
        Drawer Plugins
      </Typography>
      <Box>
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