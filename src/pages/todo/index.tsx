import React from 'react';
import {Outlet } from 'react-router-dom';
type TodoProps = {
  routes: RoutesType.Route
}
const Todo = (props:TodoProps) => {
  return (
    <>
      <h1>Todo</h1>
     <Outlet/>
    </>
  )
}

export default Todo;