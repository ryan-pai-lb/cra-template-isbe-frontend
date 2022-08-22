import Loadable from '@loadable/component';

type LoadableComponentOptions = {
  routes:RoutesType.Route[];
  LayoutLoading?:JSX.Element; 
  PageLoading?:JSX.Element;
}

export const loadableComponent = (options:LoadableComponentOptions) => {
  const routes = options.routes.map((route:RoutesType.Route) => {
    if(typeof route.componentPath === 'string') {
      const isLayout = route.componentPath.match('layout/');
      const componentPath = isLayout ? route.componentPath.replace(/layout\//i, '') : route.componentPath.replace(/pages\//i, '')
      const routeIconPath = route.icon;
      route.icon = typeof routeIconPath === 'string' && routeIconPath.match('icons/') ? 
      Loadable(() => 
      import(`@/components/icons/${routeIconPath.replace(/icons\//i, '')}`).then((module:any) => module[routeIconPath.replace(/icons\//i, '')])) : routeIconPath;

      route.element = Loadable(() => 
      isLayout ?
      import(`@/styles`).then((module:any) => module[componentPath])
      : import(`@/pages/${componentPath}`),{
        fallback: isLayout ? options.LayoutLoading : options.PageLoading
      });
      if(route.children && route.children.length) {
        route.children = loadableComponent({routes: route.children, LayoutLoading: options.LayoutLoading, PageLoading: options.PageLoading})
      }
    }
    return route
  })
  return routes
}