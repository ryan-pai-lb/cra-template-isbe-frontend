declare namespace RoutesType {
  interface Route {
    title?:string;
    icon?:string;
    path: string;
    redirect?: any;
    componentPath?:string;
    element?: string | LoadableClassComponent;
    order?:number;
    children?:Route[] | [];
    visibleBreadcrumb?:boolean;
    hasBreadcrumbLink?:boolean;
    visibleNav?:boolean;
  }
}