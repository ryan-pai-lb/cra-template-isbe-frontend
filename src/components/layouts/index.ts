import DrawerHeader from "./DrawerHeader"

export type LayoutsPluginType = {
  [layoutName:string]: {} ;
}

const LayoutsPlugin:LayoutsPluginType = {
  Drawer : {
    componentPlugins: {
      DrawerHeader
    },
    defaultOpen: true
  }
}
export default LayoutsPlugin