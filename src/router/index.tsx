import React, { } from 'react';
import { EnhancedStore } from '@reduxjs/toolkit';
import Loadable, {LoadableClassComponent} from '@loadable/component';
import {createBrowserRouter, RouteObject, matchRoutes, matchPath, redirect, useLocation } from 'react-router-dom';
import routesJSON from './routes.json';
import { AppDispatch } from '@/reducers/store';
import LayoutLoading from '@/components/LayoutLoading';
import layoutPlugins from '@/plugins'
import PageLoading from '@/components/PageLoading';
import _ from 'lodash';
import App, {appLoader} from '@/App';
import { globalApi  } from '@/services/globalApi';
import { globalActions } from '@/reducers/global.slice';
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
const langPathRegex = langsKeys.length > 1 ? _.chain(langsKeys).reduce((a ,b) => a +  `|${b.keys}`, langsKeys[0].keys).value() : langsKeys[0].keys;
const langs = langPathRegex.split('|');
const isVerifyToken = ProjectConfig.enableVerifyToken.value;
const isEnableMetaAPI = ProjectConfig.enableMetaAPI.value;

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
        const dispatch:AppDispatch = store.dispatch;
        const {lang} = params;
        const location = {
          pathname: request.url.replace(window.location.origin, '')
        }
        const matchedRoute = matchRoutes(routesJSON, location, (langs.includes(lang || '') && `/${lang}`) || '') || [];
        const matchPathRoute = matchPath(lang ? `/${lang}/${route.path || ''}` : route.path || '', request.url.replace(window.location.origin, ''));
       
        if(isLayout) {
          if(isVerifyToken && !request.url.replace(window.location.origin, '').match('user')) {
            const meResponse = await dispatch(globalApi.endpoints.getMe.initiate());
            
            if(meResponse.isError) {
              throw new Response("Token Invalid", { status: 401 });
            }
          } 

          if(isEnableMetaAPI){
            const metaResponse = await dispatch(globalApi.endpoints.getMeta.initiate());
           
          }
        }
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
        const dispatch:AppDispatch = store.dispatch;
        const { lang } = params;
        
        if(lang) {
          const currentLang = languages.find(item => {
            const keys = item.keys.split('|');
            return keys.includes(lang)
          });

          if(currentLang?.locale) {
            dispatch(globalActions.changeLanguage(currentLang?.locale))
          }
        }

        return await appLoader({store, request, params});
      }
    }
  ]);

  return router
}