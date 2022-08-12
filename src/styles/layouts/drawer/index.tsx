import * as React from 'react';
import { Outlet, useNavigate, useLocation, matchRoutes} from "react-router-dom";

import { 
  Box,
  Toolbar,
  IconButton,
  Typography,
  Divider,
  List,
  Drawer as MuiDrawer,
  Collapse,
  Icon
 } from '@mui/material';
import { Breadcrumb } from '@/uiComponents';
import { styled, useTheme } from '@mui/material/styles';
import { FormattedMessage } from 'react-intl';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

interface DrawerProps {
  routes:any;
  componentPlugins?: {
    DrawerHeader?:React.FunctionComponent,
    DrawerBreadcrumb?:React.FC
  }
  
}

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export const Drawer = (props:DrawerProps) => {
  const { routes, componentPlugins } = props;
  const theme = useTheme();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = React.useState(true);
  const [routeCollapseOpen, setRouteCollapseOpen] = React.useState<{[key:string]:boolean}>({});
  const location = useLocation();
  const matchedRoute = matchRoutes(routes, location) || [];

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" open={drawerOpen}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(drawerOpen && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          {
            componentPlugins && componentPlugins.DrawerHeader ? <componentPlugins.DrawerHeader/> :
              <Box display="flex" alignItems="center" width={1}>
                <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                  Drawer Layout
                </Typography>
              </Box>
           }
        </Toolbar>
      </AppBar>
      <MuiDrawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={drawerOpen}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {
            routes.map((route:RoutesType.Route) => {
              return (
                <React.Fragment key={route.path} >
                  <ListItem disablePadding>
                    <ListItemButton selected={!!matchedRoute.find((item:any) => item.pathname === route.path)} onClick={() => {
                      if(!route.children || route.children.length <= 0) {
                        navigate(route.path)
                      } else {
                        setRouteCollapseOpen({...routeCollapseOpen,[route.path]: !routeCollapseOpen[route.path]})
                      }
                    }}>
                      <ListItemIcon>
                        <Box>
                          {
                            typeof route.icon === 'string' && <Icon>{route.icon}</Icon>
                          }
                          {
                            typeof route.icon === 'object' && React.isValidElement(route.icon) &&  route.icon 
                          }
                          {
                            (typeof route.icon === 'function' || ( typeof route.icon === 'object' && !React.isValidElement(route.icon))) && <route.icon/>
                          }
                        </Box>
                      </ListItemIcon>
                      <ListItemText primary={<FormattedMessage id={route.title}/>} />
                      {
                        route.children && route.children.length > 0 ?
                        !!routeCollapseOpen[route.path] ? <ExpandLess /> : <ExpandMore /> : <></>
                      }
                    </ListItemButton>
                  </ListItem>
                  {
                    route.children && route.children.length > 0 &&
                    <Collapse in={!!routeCollapseOpen[route.path]} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        {
                          route.children.map((childrenRoute:RoutesType.Route) => {
                            return (
                              <ListItemButton selected={!!matchedRoute.find((item:any) => item.pathname === childrenRoute.path)} onClick={()=>  navigate(childrenRoute.path)} key={childrenRoute.path} sx={{ pl: 9 }}>
                                <ListItemText primary={<FormattedMessage id={childrenRoute.title}/>} />
                              </ListItemButton>
                            )
                          })
                        }
                      </List>
                    </Collapse>
                  }
                </React.Fragment>
              )
            })
          }
        </List>
      </MuiDrawer>
      <Main open={drawerOpen}>
        <DrawerHeader />
        <Box p={3}>
          {
            componentPlugins?.DrawerBreadcrumb ? <componentPlugins.DrawerBreadcrumb/>
            : <Breadcrumb routes={routes} configs={{enableIcon:true}}/>
          }
        </Box>
        <Box>
          <Outlet/>
        </Box>
      </Main>
    </Box>
  );
}

export default Drawer;