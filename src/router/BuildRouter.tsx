import React from 'react';
import {Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getGlobal } from '@/reducers/states';
import layoutPlugins from '@/plugins'

const Children = (routes:any) => {
  return (
    <>
    {
      routes.map((route:any, index:number) => {
        const RouteComponent:any = route.element;
        return (<React.Fragment key={route.path}>
            {
              route.redirect &&
              <Route path={route.path} element={<Navigate to={route.redirect}/>}/>
            }
            <Route children={Children(route.children)} path={route.path} element={<RouteComponent routes={route.children}/>}/>
          </React.Fragment>
        )
      })
    }
    </>
  )
}

const Router = (props:{routes:any, appConfig:any}) => {
  const {routes, appConfig} = props;
  const NotFound = routes.find((route:any) => route.path === '/404').element
  const global = useSelector(getGlobal);

  return(
    <Routes>
      {
        routes.filter((route:any) => route.path !== '/404').map((route:any, index:number) => {
          const RouteComponent:React.FunctionComponent<any> = route.element;
          const layoutName = route.isRoot ? route.componentPath.replace(/layout\//i, '') : '';
          const componentPlugins = layoutPlugins[layoutName]

          if(route.path !== '/user' && appConfig.enableVerifyToken.value && !global.user.loaded) {
            return (
              <React.Fragment key={route.path}>
                <Route path="*" element={<Navigate to={'/user'}/>}/>
              </React.Fragment>
            )
          }
          return (
            <React.Fragment key={route.path}>
              {
                route.redirect &&
                <Route path={route.path} element={<Navigate to={route.redirect}/>}/>
              }
              <Route children={<>{Children(route.children)} <Route path="*" element={<NotFound/>}/></>} path={route.path} element={<RouteComponent routes={route.children} componentPlugins={componentPlugins}/>}/>
            </React.Fragment>
          )
        })
      }
      
    </Routes>
  )
}

export default Router