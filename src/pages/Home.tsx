import React from 'react'
import { Button} from '@mui/material';
import { useDispatch } from 'react-redux';
import { globalActions } from '@/reducers/global.slice';

const Title = () => {
  return (
    <div>Title</div>
  )
}

const Home = () => {
  const dispatch = useDispatch();

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