import React, { useEffect } from 'react'
import { useLoaderData } from 'react-router-dom';
import { Button} from '@mui/material';
import { useDispatch } from 'react-redux';
import { globalActions } from '@/store/global.slice';
import { api } from '@/services'
export const loader = async() => {
  // throw new Response("Not Found", { status: 404 });
  return null
}

const Title = () => {
  return (
    <div>Title</div>
  )
}

const Home = () => {
  const dispatch = useDispatch();
  const homeLoaderDate = useLoaderData();
  
  useEffect(() => {
    // console.log(homeLoaderDate)
  }, [])
  return (
    <>
      <h1>Home</h1>
      <Button onClick={() => dispatch(globalActions.toogleDialog({
        visible: true, 
        close: true,
        backdropClose: true,
        confirm: true,
        content: 'Content',
        title: <Title/>
      }))}>Dialog Open</Button>
      <Button
      onClick={() => dispatch(globalActions.snackbarRequest({
        visible: true,
        variant: 'success',
        content: '註冊成功',
        anchorOrigin:{
        vertical: 'top',
        horizontal: 'right'
        }
      }))}
      >
        Snackbar Open
      </Button>
    </>
  )
}

export default Home;