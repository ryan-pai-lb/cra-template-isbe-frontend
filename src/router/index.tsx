import React, { } from 'react';
import { EnhancedStore } from '@reduxjs/toolkit';
import Loadable, {LoadableClassComponent} from '@loadable/component';
import {createBrowserRouter, RouteObject, matchRoutes, matchPath, redirect, useLocation } from 'react-router-dom';
import routesJSON from './routes.json';

import LayoutLoading from '@/components/LayoutLoading';
import layoutPlugins from '@/plugins'
import PageLoading from '@/components/PageLoading';
import _ from 'lodash';
import App from '@/App';
import { appLoader } from '@/plugins/AppPlugins';
import RouteError from '@/pages/RouteError';
import ProjectConfig from '@/project.config.json';

export type RoutesJSON = typeof routesJSON;
export interface RouteItem {
  path?: string;
  index?: boolean;
  children?: RouteItem[];
  caseSensitive?: boolean;
  id?: string;
  errorElement?: React.ReactNode | null;
  title?:string;
  icon?:string | React.FC | LoadableClassComponent<React.ComponentClass>;
  redirect?: any;
  element: string;
  order?:number;
  hiddenBreadcrumb?:boolean;
  disabledBreadcrumbLink?:boolean;
  hiddenNavigation?:boolean;
}

export interface LangsKey {
  locale:string,
  label: string,
  id: number,
  keys: string
}

const languages = _.values(ProjectConfig.languages);
const langsKeys = _.chain(languages).value();
const langPathRegex = langsKeys.length > 1 ? _.chain(langsKeys).reduce((a:string ,b) => a +  `|${b.keys}`, langsKeys[0].keys).value() : langsKeys[0].keys;
const langs = langPathRegex.split('|');

export const createRouter = (store:EnhancedStore) => {
  const createRoute = (routes?:RouteItem[]) => {
    let childrenRoutes:RouteObject[];
    childrenRoutes = (routes && routes.map((route) => {
      const newRoute:RouteObject = {}
      const isLayout = !!route.element.match('layout/');
      const elementPath = route.element.replace('layout/', '').replace('pages/', '');
      const Element = Loadable(() =>  isLayout ?import(`@/styles`).then((module:any) => module[elementPath]): import(`@/pages/${elementPath}`),{
        fallback: isLayout ? <LayoutLoading/> : <PageLoading/>
      });
      const layoutName = isLayout ? route.element.replace(/layout\//i, '') : '';
      const componentPlugins = layoutPlugins[layoutName]

      newRoute.path = route.path
      newRoute.element = <Element routes={route.children} componentPlugins={componentPlugins}/>
      newRoute.errorElement = <RouteError/>
      newRoute.children = createRoute(route.children);
      newRoute.loader = async({request, params}) => {
        const {lang} = params;
        const location = {
          pathname: request.url.replace(window.location.origin, '')
        }
        const matchedRoute = matchRoutes(routesJSON, location, (langs.includes(lang || '') && `/${lang}`) || '') || [];
        const matchPathRoute = matchPath(lang ? `/${lang}/${route.path || ''}` : route.path || '', request.url.replace(window.location.origin, ''));

        //合法語系
        if((lang && !langs.includes(lang)) || (!isLayout && matchedRoute.length <= 0)) {
          throw new Response("Not Found", { status: 404 });
        } 
     
        //has redirect
        else if(route.redirect && request.url.replace(window.location.origin, '') !== route.redirect && matchPathRoute) {
          return redirect(lang ? `/${lang}${route.redirect}` : route.redirect);
        } 
        
        //page loader
        else {
          const pageModule:any  = await Element.load();
          if(typeof pageModule === 'object' && pageModule.loader) {
            return  await pageModule.loader({store, request, params});
          } else  {
            return null
          }
        }
      }
      return newRoute;
    })) || [];

    childrenRoutes.push({
      path: "*",

      errorElement: <RouteError/>
    })
    return childrenRoutes
  }

  const router = createBrowserRouter([
    {
      path: "/:lang?",
      element: <App/>,
      children: createRoute(routesJSON),
      loader: async({request, params}) => {
        return await appLoader({store, request, params});
      }
    }
  ]);

  return router
}