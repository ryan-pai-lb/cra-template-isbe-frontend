import React from 'react';
import { Link } from "react-router-dom";
import { Outlet } from 'react-router-dom';

import { 
  Box,
 } from '@mui/material';
// import {injectIntl} from 'react-intl';
// import Permission from 'components/Permission';
// import LayoutHelmetHead from 'components/LayoutHelmetHead';

// const permissionType:any = BasicConfig.basic.permissionType.value


export interface DefaultProps {
  routes:any
}
export const Default = (props:DefaultProps) => {
  const {routes} = props

  return (
    <>
      <h1>Default Layout</h1>
     
      {
        routes.map((route:any, index:number) => {
         
          return (
            <React.Fragment key={index}><Link to={route.path}>{route.path}</Link> |{" "}</React.Fragment>
          )
        })
      }
     
     <Box p={3}><Outlet/></Box>
    </>
  )
}

export default Default;