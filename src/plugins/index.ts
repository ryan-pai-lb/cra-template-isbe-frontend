import React from 'react'
import DrawerHeader from "./DrawerHeader"
import AppPlugins from "./AppPlugins";

export type PluginType = {
  App:React.FC;
  [layoutName:string]: {} ;
}

const plugins:PluginType = {
  App: AppPlugins,
  Drawer : {
    DrawerHeader
  }
}
export default plugins