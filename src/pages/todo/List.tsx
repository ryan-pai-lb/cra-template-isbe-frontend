import { Box} from '@mui/material';
import { useSelector } from 'react-redux';
import {ExampleTodoItem} from '../../reducers/example.slice';
import { getExample } from '@/reducers/states';

const TodoList = () => {
  const {todo: todoStore} = useSelector(getExample)
  
  return(
    <>
    <h1>TodoList</h1>
      {
        todoStore.data.map((item:ExampleTodoItem) => {
          return <Box key={item.id}>{item.message}</Box>
        })
      }
    </>
  )
}

export default TodoList;