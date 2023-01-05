import { Box, Button, Paper} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { globalActions } from '@/reducers/global.slice';
import { getGlobal } from '@/reducers/states';
import { useEffect } from 'react';
import useRouteNavigate from '@/hooks/useRouteNavigate'

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useRouteNavigate();

  const onLogin = () => {
    localStorage.setItem('auth-token', '3C-rZnJWf324I7mv2gSYs6-wYi4wcfJ7OWyPvl-UOcrxBcTHPQ')
    // navigate('/')
    navigate('/');
  }
  return (
    <Box minHeight={'100vh'} display="flex" alignItems={'center'} justifyContent="center">
      <Paper elevation={3}>
        <Box minWidth={320} p={3}>
          <Box textAlign="center" fontSize={20} fontWeight="bold" mb={1}>Login Page</Box>
          <Button fullWidth onClick={onLogin} variant='contained' color="primary">Login</Button>
        </Box>
      </Paper>
    </Box>
  )
}

export default Login