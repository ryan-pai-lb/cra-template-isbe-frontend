import React, { useEffect, useState, FC } from 'react';
import { Outlet, useLocation, matchRoutes, useParams} from "react-router-dom";
import useRouteNavigate from '@/hooks/useRouteNavigate'
import Loadable from '@loadable/component';
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
    DrawerHeader?:FC,
    DrawerBreadcrumb?:FC
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
  const navigate = useRouteNavigate();
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [routeCollapseOpen, setRouteCollapseOpen] = useState<{[key:string]:boolean}>({});
  const location = useLocation();
  const params = useParams();
  const { lang } = params;

  const matchedRoute = matchRoutes(routes, location, lang && `/${lang}` || '') || [];
  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  useEffect(() => {
    if(routes.length) {
      let matchRoutePath:{[key:string]: boolean} = {}
      matchedRoute.map((route) => {
        return route.pathname
      }).forEach((path:string) => {
        matchRoutePath[path] = true;
      });
      setRouteCollapseOpen(matchRoutePath)
    }
  }, [routes]);

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
            routes.map((route:any) => {
              const rootPath = `/${route.path}`;
              const routeIconPath = route.icon;
              route.icon = typeof routeIconPath === 'string' && routeIconPath.match('icons/') ? 
              Loadable(() => import(`@/components/icons/${routeIconPath.replace(/icons\//i, '')}`)
              .then((module:any) => module[routeIconPath.replace(/icons\//i, '')])) 
              : routeIconPath;

              return (
                <React.Fragment key={rootPath} >
                  <ListItem disablePadding>
                    <ListItemButton selected={!!matchedRoute.find((item:any) => item.pathname === rootPath)} onClick={() => {
                      if(!route.children || route.children.length <= 0) {
                        navigate(rootPath)
                      } else {
                        setRouteCollapseOpen({...routeCollapseOpen,[rootPath]: !routeCollapseOpen[rootPath]})
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
                            (typeof route.icon === 'function' || ( typeof route.icon === 'object' && !React.isValidElement(route.icon))) && <route.icon />
                          }
                        </Box>
                      </ListItemIcon>
                      <ListItemText primary={<FormattedMessage id={route.title}/>} />
                      {
                        route.children && route.children.length > 0 ?
                        !!routeCollapseOpen[rootPath] ? <ExpandLess /> : <ExpandMore /> : <></>
                      }
                    </ListItemButton>
                  </ListItem>
                  {
                    route.children && route.children.length > 0 &&
                    <Collapse in={!!routeCollapseOpen[rootPath]} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        {
                          route.children.map((childrenRoute:any) => {
                            const childrenPath = `${rootPath}/${childrenRoute.path}`
                            return (
                              <ListItemButton selected={!!matchedRoute.find((item:any) => item.pathname === childrenPath )} onClick={()=>  navigate(childrenPath)} key={childrenRoute.path} sx={{ pl: 9 }}>
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