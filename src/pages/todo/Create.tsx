import {useState, memo} from 'react';
import { Box, Button, TextField, CircularProgress, Paper } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import {exampleActions} from '@/reducers/example.slice';
import { getExample } from '@/reducers/states';

const CreateTodo = memo(() => {
  const { todo: todoStore } = useSelector(getExample)
  const [message,setMessage] = useState<string>('');
  const dispatch = useDispatch()

  const onAdd = () => {
    dispatch(exampleActions.addRequest({message}))
  }
  return (
    <Box p={3} display="flex">
      <Box flex={1} mr={1}><TextField fullWidth value={message} onInput={(event:React.ChangeEvent<HTMLInputElement>) => setMessage(event.target.value) }/></Box>
      <Button disabled={todoStore.loading} variant='contained' color="primary" onClick={onAdd}>
        {
          todoStore.loading && <CircularProgress size={14}/>
        }
        Add
      </Button>
    </Box>
  )
})

const TodoCreate = () => {
  return (
    <>
      <h1>Create</h1>
      <Paper>
        <CreateTodo/>
      </Paper>
      
    </>
  )
}

export default TodoCreate;