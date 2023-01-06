import DrawerHeader from "./DrawerHeader"

export type LayoutsPluginType = {
  [layoutName:string]: {} ;
}

const LayoutsPlugin:LayoutsPluginType = {
  Drawer : {
    DrawerHeader
  }
}
export default LayoutsPlugin