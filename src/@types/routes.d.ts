declare namespace RoutesType {
  interface Route {
    title?:string;
    icon?:string | React.FC | LoadableClassComponent;
    path: string;
    redirect?: any;
    componentPath?:string;
    element?: string | LoadableClassComponent;
    order?:number;
    children?:Route[] | [];
    hiddenBreadcrumb?:boolean;
    disabledBreadcrumbLink?:boolean;
    hiddenNavigation?:boolean;
  }
}