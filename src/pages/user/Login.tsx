import { Box, Button, Paper} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { globalActions } from '@/reducers/global.slice';
import { getGlobal } from '@/reducers/states';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(getGlobal)
  const navigate = useNavigate();

  useEffect(() => {
    if(user.loaded) {
      navigate('/')
    }
  }, [user.loaded, navigate]);
  return (
    <Box minHeight={'100vh'} display="flex" alignItems={'center'} justifyContent="center">
      <Paper elevation={3}>
        <Box minWidth={320} p={3}>
          <Box textAlign="center" fontSize={20} fontWeight="bold" mb={1}>Login Page</Box>
          <Button fullWidth onClick={() => {
            dispatch(globalActions.getUserInfoSuccess({}))
          }} variant='contained' color="primary">Login</Button>
        </Box>
      </Paper>
    </Box>
  )
}

export default Login