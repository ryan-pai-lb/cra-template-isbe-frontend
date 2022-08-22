import React from 'react';
import { useNavigate, useLocation, matchRoutes, RouteMatch} from "react-router-dom";
import {
  FormattedMessage,
} from 'react-intl';
import {
  Breadcrumbs,
  Typography,
  Icon,
  Box,
  Link
} from '@mui/material';
import { ThemeProvider, createTheme, Theme} from '@mui/material/styles';
import { defaultTheme as BasicTheme } from '@/styles'; 
import _ from 'lodash';
import { LoadableClassComponent } from '@loadable/component';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

interface RouteMatchExtend extends RouteMatch {
  route:any
}

export interface BreadcrumbProps {
  options?: BreadcrumbOptions;
  overrideTheme?: Theme;
  configs?:BreadcrumbConfigs;
  routes:RoutesType.Route[];
}

export type BreadcrumbConfigs ={
  enableIcon?:boolean;
}

export interface BreadcrumbOptions {
  
}

const LinkIcon = (props:{icon:string | React.FC |  LoadableClassComponent<any>}) => {
   
    return (
      <>
        {
          typeof props.icon === 'string' && <Icon>{props.icon}</Icon>
        }
        {
          typeof props.icon === 'object' && React.isValidElement(props.icon) &&  props.icon 
        }
        {
          (typeof props.icon === 'function' || ( typeof props.icon === 'object' && !React.isValidElement(props.icon))) && <Box display="flex" color="primary.main"><props.icon /></Box>
        }
      </>
    )
}

export const Breadcrumb = (props: BreadcrumbProps) => {
  const { overrideTheme, configs, routes} = props;
  const componentConfig = configs || {};
  const { enableIcon } = componentConfig;
  const navigate = useNavigate();
  const location = useLocation();
    
  const defaultTheme = createTheme(_.defaultsDeep( BasicTheme))

  const theme:any = createTheme(_.defaultsDeep({
    overrides: {
     
    }
  }, overrideTheme || defaultTheme));

  const matchedRoutes:RouteMatchExtend[] = matchRoutes(routes, location) || [];

  return (
    <ThemeProvider<Theme> theme={theme}>
      <Breadcrumbs>
        {
          matchedRoutes && matchedRoutes.filter((item:RouteMatchExtend) => !item.route.hiddenBreadcrumb).map((item:RouteMatchExtend, index:number) => {
            const route = item.route ;
            if(route.disabledBreadcrumbLink || matchedRoutes.length - 1 == index) {
              return (
                <Box key={route.path} display="flex">
                  {
                    (enableIcon && route.icon) && <LinkIcon icon={route.icon}/>
                  }
                  <Typography color="text.primary"><FormattedMessage id={route.title} defaultMessage={route.title}/></Typography>
                </Box>
              )
            } else {
              return (
                <Link href="/" key={route.path} onClick={(event: React.SyntheticEvent) => {
                  event.preventDefault();
                  navigate(route.path)
                }}>
                  <Box key={route.path} display="flex">
                    {
                      (enableIcon && route.icon) && <LinkIcon icon={route.icon}/>
                    }
                    <FormattedMessage id={route.title} defaultMessage={route.title}/>
                  </Box>
                </Link>
              )
            }
          })
        }
      </Breadcrumbs>
    </ThemeProvider>
  )
}

export default Breadcrumb;